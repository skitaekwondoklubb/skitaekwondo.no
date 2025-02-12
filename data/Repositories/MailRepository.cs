using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using Azure;
using Azure.Communication.Email;
using Microsoft.Extensions.Configuration;
using Microsoft.Graph;
using SkiTKD.Data.Entities;
using SkiTKD.Data.Interfaces;
using SkiTKD.Data.Models;
using EmailAddress = Azure.Communication.Email.EmailAddress;

namespace SkiTKD.Data.Repositories
{
    public class MailRepository : IMailRepository
    {
        private readonly string password;
        private readonly IGraphTokenService _tokenService;
        private readonly SkiTKDContext _dbContext;
        private readonly IVinterleirRegistrationRepository _vinterleirRegRepo;
        private readonly IGraderingRepository _graderingRepo;
        private readonly IPaymentRepository _paymentRepo;
        private readonly ILedsagerRepository _ledsagerRepo;
        private readonly IVippsRepository _vippsRepo;
        private readonly bool _sendMail = true;


        public MailRepository(
            IConfiguration config, 
            // IGraphTokenService graphToken, 
            SkiTKDContext dbContext, 
            IVinterleirRegistrationRepository regRepo,
            IPaymentRepository paymentRepo,
            ILedsagerRepository ledsagerRepo,
            IVippsRepository vippsRepo,
            IGraderingRepository graderingRepo
        ) {
            password = config["Pass"];
            if(config["SendMail"] != null) {
                _sendMail = bool.Parse(config["SendMail"]);
            }

            // _tokenService = graphToken;
            _dbContext = dbContext;
            _vinterleirRegRepo = regRepo;
            _paymentRepo = paymentRepo;
            _ledsagerRepo = ledsagerRepo;
            _vippsRepo = vippsRepo;
            _graderingRepo = graderingRepo;
        }

        public bool SendMail(RegistrationEntity registration) {
            if(registration.mailsent == false) {
                if(registration is OtherRegistrationEntity) {
                    SendOrderRecieptThroughMail(registration);
                }
                else if(registration is SkoleRegistrationEntity) {
                    SendSkoleMailToRecipient(registration);
                }
                else {
                    SendMailToRecipient(registration);
                }
                registration.mailsent = true;
                _dbContext.SaveChanges();
            }

            return false;
        }

        private string GetOrder(RegistrationEntity reg) {

            if(reg is VinterleirRegistrationEntity) {
                return GetVinterleirOrder(reg as VinterleirRegistrationEntity);
            }
            else if(reg is GraderingRegistrationEntity) {
                return GetGraderingOrder();
            }
            else if(reg is SkoleRegistrationEntity) {
                return $"Påmelding til sommerskole for {reg.Person.firstname} {reg.Person.lastname}";
            }

            throw new Exception($"Ingen registrering med denne typen.");
        }

        private string GetGraderingOrder() {
            var builder = new StringBuilder();
            builder.Append("<li>");
            builder.Append($"Gradering: {PaymentRepository.GetTotalGradering}");
            builder.Append("</li>");
            return builder.ToString();
        }

        private int CalculateEarlyBird(int price) {
            var currentDate = DateTime.UtcNow;
            var earlyBirdDate = new DateTime(currentDate.Year, 10, 1);
            var prettyEarlyBird = new DateTime(currentDate.Year, 11, 1);

            if(currentDate < earlyBirdDate) {
                var newprice = (price * (100-20)) / 100;
                return newprice;
            }
            else if(currentDate >= earlyBirdDate && currentDate <= prettyEarlyBird) {
                return (price * (100-10)) / 100;
            }

            return price;
        } 

        private string GetVinterleirOrder(VinterleirRegistrationEntity registration) {
            var currentDate = DateTime.UtcNow;
            var etterregistering = new DateTime(currentDate.Year, 11, 20);
            var isEtterregistrering = currentDate > etterregistering;

            var orders = new List<string>();
            var name = $"{registration.Person.firstname} {registration.Person.lastname}";

            if(registration?.Club?.name == "Ski Taekwondo Klubb") {
                orders.Add($"{name}: 0 kr (gratis for Ski Taekwondo Klubb)");
            }
            else if(registration.Person.age <= 12) {
                orders.Add($"{name}: {CalculateEarlyBird(1025)}kr (barn)");
                if(isEtterregistrering) {
                    orders.Add("Sen registrering: 100kr");
                }
            }
            else {
                orders.Add($"{name}: {CalculateEarlyBird(1200)} kr");
                if(isEtterregistrering) {
                    orders.Add("Sen registrering: 100kr");
                }
            }

            var ledsagere = _ledsagerRepo.FindLedsagersForPerson(registration.personid);
            if(ledsagere != null || ledsagere.Count > 0) {
                foreach (var ledsager in ledsagere)
                {
                    orders.Add($"{ledsager.Person.firstname} {ledsager.Person.lastname}: 550 kr (ledsager)");
                }
            }

            // 14 er Rødt med tre sorte.
            if(registration.gradering && registration.gradeid < 14) {
                orders.Add($"Gradering: 350 kr");
            }

            var builder = new StringBuilder();
            foreach (var order in orders)
            {
                builder.Append("<li>");
                builder.Append(order);
                builder.Append("</li>");
            }

            return builder.ToString();
        }

        private bool SendOrderRecieptThroughMail(RegistrationEntity registration) {
              try {
                var f = new GraphServiceClient(
                new DelegateAuthenticationProvider(
                    (requestMessage) =>
                    {
                        requestMessage.Headers.Authorization = new AuthenticationHeaderValue("bearer", _tokenService.GetToken().GetAwaiter().GetResult());
                        return Task.FromResult(0);
                    })
                );

                var allTshirts = _dbContext.Tshirts.Where(x => x.registrationid == registration.registrationid).Select(y => new TShirtModel {
                    Size = y.size,
                    Model = y.model
                }).ToList();                
                var payment = registration.Payment ?? _paymentRepo.FindPaymentById(registration.paymentid ?? throw new Exception("Mangler paymentId i registrering."));
                var paymentMethod = payment.vipps ? "Vipps" : "Kort/Kontant";
                var orderId = "";


                // Vis ordrenummer hvis dette er Vipps.
                if(payment.vipps && registration.Payment.VippsEntity != null) {
                    orderId = $"<p>Vipps ordernummer: {registration.Payment.VippsEntity.orderid}</p>";
                }

                var order = GetOtherReceipt(registration, allTshirts, paymentMethod, orderId);

                // var message = new Message
                // {
                //     Subject = $"Kvittering på kjøp av t-skjorter",
                //     Body = new ItemBody
                //     {
                //         ContentType = BodyType.Html,
                //         Content = order
                //     },
                //     ToRecipients = new List<Recipient>()
                //     {
                //         new Recipient
                //         {
                //             EmailAddress = new EmailAddress
                //             {
                //                 Address = registration.Person.email
                //             }
                //         }
                //     }
                // };
                

                // f.Me.SendMail(message, null).Request().PostAsync().GetAwaiter().GetResult();

                return true;
            }
            catch(Exception e) {
                Console.WriteLine("Klarte ikke levere mail!");
                throw e;
            }
        }

        private bool SendMailToRecipient(RegistrationEntity registration) {
              try {
                
                var order = GetOrder(registration);
                var payment = registration.Payment ?? _paymentRepo.FindPaymentById(registration.paymentid ?? throw new Exception("Mangler paymentId i registrering."));
                var paymentMethod = payment.vipps ? "Vipps" : "Kort/Kontant";
                var orderId = "";

                // Vis ordrenummer hvis dette er Vipps.
                if(payment.vipps && registration.Payment.VippsEntity != null) {
                    orderId = $"<p>Vipps ordernummer: {registration.Payment.VippsEntity.orderid}</p>";
                }

                // var message = new MimeMessage();
                // message.From.Add (new MailboxAddress ("Ski Taekwondo Klubb", "ikkesvarskitaekwondo@outlook.com"));
                // message.To.Add (new MailboxAddress ($"{registration.Person.firstname} {registration.Person.lastname}", registration.Person.email));
                // message.Subject = $"Du er registrert til {GetTypeTitle(registration)}";

                // message.Body = new TextPart ("html") {
                //     Text = registration is VinterleirRegistrationEntity ? GetVinterleirReceipt(registration, order, paymentMethod, orderId) : GetGraderingReceipt(registration, order, paymentMethod, orderId)
                // };

                // using (var client = new SmtpClient ()) {
                //     client.Connect ("smtp.office365.com", 587, false);

                //     // Note: only needed if the SMTP server requires authentication
                //     client.Authenticate (user, password);

                //     client.Send (message);
                //     client.Disconnect (true);
                // }

                return true;
            }
            catch(Exception e) {
                Console.WriteLine("Klarte ikke levere mail!");
                
                throw e;
            }
        }

        public bool SendMail(List<EmailAddress> mailTo, EmailContent email) {

            if(!_sendMail) {
                return true;
            }

            string connectionString = $"endpoint={password}";
            var emailClient = new EmailClient(connectionString);

            var emailMessage = new EmailMessage(
                senderAddress: "DoNotReply@skitaekwondo.no",
                content: email,
                recipients: new EmailRecipients(mailTo));

            EmailSendOperation emailSendOperation = emailClient.Send(
                WaitUntil.Completed,
                emailMessage);
            return true;
        }

         private bool SendSkoleMailToRecipient(RegistrationEntity registration) {
              try {

                // var message = new MimeMessage();
                // message.From.Add (new MailboxAddress ("Ski Taekwondo Klubb", "ikkesvarskitaekwondo@outlook.com"));
                // message.To.Add (new MailboxAddress ($"{registration.Person.firstname} {registration.Person.lastname}", registration.Person.email));
                // message.Subject = $"Du er registrert til sommerskole";

                // message.Body = new TextPart ("html") {
                //     Text = @$"
                //         <p>Hei {registration.Person.firstname} {registration.Person.lastname}, du er registrert til sommerskole i Ski Taekwondo Klubb.<p>
                //         <p>For spørsmål eller avbestiling, ta kontakt med oss på <a href='mailto: kontakt@skitaekwondo.no'>kontakt@skitaekwondo.no</a></p>
                //         <p>Velkommen!</p>
                //         <p>Med vennlig hilsen<p>
                //         <p>Ski Taekwondo Klubb</p>
                //     "
                // };

                // using (var client = new SmtpClient ()) {
                //     client.Connect ("smtp.office365.com", 587, false);

                //     // Note: only needed if the SMTP server requires authentication
                //     client.Authenticate (user, password);

                //     client.Send (message);
                //     client.Disconnect (true);
                // }

                return true;
            }
            catch(Exception e) {
                Console.WriteLine("Klarte ikke levere mail!");
                
                throw e;
            }
        }


        private string GetTypeTitle(RegistrationEntity reg) {
             return reg is VinterleirRegistrationEntity ? "vinterleir" : "gradering";
        }
    
        private string GetVinterleirReceipt(RegistrationEntity reg, string order, string paymentMethod, string orderId) {
            if(!(reg is VinterleirRegistrationEntity)) {
                throw new Exception("Klarte ikke sende mail: Feil registreringstype.");
            }

            return @$"
                <h1>Takk for at du registrerte deg til vinterleir!</h1>
                <p>Hei {reg.Person.firstname} {reg.Person.lastname}, du er herved registrert til Ski Taekwondo Klubbs vinterleir {DateTime.Now.Year}.<p>
                <p>Her følger en kvittering:<p>
                <ul>{order}</ul>
                <p>Betalingsmåte: {paymentMethod}</p>
                {orderId}
                <p>Denne e-posten kan ikke svares på. For avbestilling eller spørsmål, ta kontakt med oss på <a href='mailto: kontakt@skitaekwondo.no'>kontakt@skitaekwondo.no</a></p>
                <p>Med vennlig hilsen<p>
                <p>Ski Taekwondo Klubb</p>
            ";
        }

        private string GetGraderingReceipt(RegistrationEntity reg, string order, string paymentMethod, string orderId) {
            if(!(reg is GraderingRegistrationEntity)) {
                throw new Exception("Klarte ikke sende mail: Feil registreringstype.");
            }

            return @$"
                <p>Hei {reg.Person.firstname} {reg.Person.lastname}, du er herved registrert til gradering i Ski Taekwondo Klubb.<p>
                <p>Her følger en kvittering:<p>
                <ul>{order}</ul>
                <p>Graderingen skal betales i lokalene på graderingsdagen.</p>
                <p>For avbestilling, ta kontakt med oss på <a href='mailto: kontakt@skitaekwondo.no'>kontakt@skitaekwondo.no</a></p>
                <p>Lykke til!</p>
                <p>Med vennlig hilsen<p>
                <p>Ski Taekwondo Klubb</p>
            ";
        }

        private string GetOtherReceipt(RegistrationEntity reg, List<TShirtModel> order, string paymentMethod, string orderId) {
            if(!(reg is OtherRegistrationEntity)) {
                throw new Exception("Klarte ikke sende mail: Feil registreringstype.");
            }

            var orderBuilder = new StringBuilder();
            foreach (var item in order)
            {
                if(order.First() == item) {
                    orderBuilder.Append($"<ul>T-skjorte: {item.Model}, {item.Size} (Gratis)</ul>");
                }
                else {
                    orderBuilder.Append($"<ul>T-skjorte: {item.Model}, {item.Size} (160kr)</ul>");
                }
            }

            var total = (order.Count - 1) * 160;

            return @$"
                <p>Hei {reg.Person.firstname} {reg.Person.lastname}, takk for at dere støtter Ski Taekwondo Klubb!<p>
                <p>Her følger en kvittering:<p>
                {orderBuilder.ToString()}
                <p>Totalt: {total}kr</p>
                <p>Betalingsmåte: {paymentMethod}</p>
                {orderId}
                <p>For avbestilling eller bestilling av flere t-skjorter, ta kontakt med oss på <a href='mailto: kontakt@skitaekwondo.no'>kontakt@skitaekwondo.no</a></p>
                <p>Med vennlig hilsen<p>
                <p>Ski Taekwondo Klubb</p>
            ";
        }
    }
}

