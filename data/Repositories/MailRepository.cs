using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.Graph;
using SkiTKD.Data.Entities;
using SkiTKD.Data.Interfaces;
using static SkiTKD.Data.Models.VinterleirRegistration;

namespace SkiTKD.Data.Repositories
{
    public class MailRepository : IMailRepository
    {
        private readonly string clientId;
        private readonly string user;
        private readonly string path;
        private readonly string password;
        private readonly IGraphTokenService _tokenService;
        private readonly SkiTKDContext _dbContext;
        private readonly IRegistrationRepository _regRepo;
        private readonly IPaymentRepository _paymentRepo;
        private readonly ILedsagerRepository _ledsagerRepo;
        private readonly IVippsRepository _vippsRepo;


        public MailRepository(
            IConfiguration config, 
            IGraphTokenService graphToken, 
            SkiTKDContext dbContext, 
            IRegistrationRepository regRepo,
            IPaymentRepository paymentRepo,
            ILedsagerRepository ledsagerRepo,
            IVippsRepository vippsRepo) {
            clientId = config["ClientId"];
            user = config["ExcelUser"];
            path = config["VinterleirPath"];
            password = config["Pass"];
            _tokenService = graphToken;
            _dbContext = dbContext;
            _regRepo = regRepo;
            _paymentRepo = paymentRepo;
            _ledsagerRepo = ledsagerRepo;
            _vippsRepo = vippsRepo;
        }

        public bool SendMail(int registrationId) {
           var registration = _dbContext.Registrations.Single(x => x.registrationid == registrationId);

            if(registration.mailsent == false) {
                SendMailToRecipient(registration);
                registration.mailsent = true;
                _dbContext.SaveChanges();
            }

            return false;
        }

        private string GetOrder(RegistrationEntity registration) {
            var orders = new List<string>();
            var name = $"{registration.Person.firstname} {registration.Person.lastname}";
            if(registration.instructor == InstructorType.SkiFullTimeInstructor) {
                orders.Add($"{name}: 0 kr (Instruktør ved Ski Taekwondo Klubb)");
            }
            else if(registration.instructor == InstructorType.SkiHelperInstructor) {
                orders.Add($"{name}: 500 kr (Hjelpeinstruktør ved Ski Taekwondo Klubb)");
            }
            else if(registration.Person.age >= 18) {
                orders.Add($"{name}: 975 kr (voksen)");
            }
            else {
                orders.Add($"{name}: 825 kr (barn)");
            }

            var ledsagere = _ledsagerRepo.FindLedsagersForPerson(registration.personid);
            if(ledsagere != null || ledsagere.Count > 0) {
                foreach (var ledsager in ledsagere)
                {
                    orders.Add($"{ledsager.Person.firstname} {ledsager.Person.lastname}: 500 kr (ledsager)");
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

        private bool SendMailToRecipient(RegistrationEntity registration) {
              try {
                var f = new GraphServiceClient(
                new DelegateAuthenticationProvider(
                    (requestMessage) =>
                    {
                        requestMessage.Headers.Authorization = new AuthenticationHeaderValue("bearer", _tokenService.GetToken().GetAwaiter().GetResult());
                        return Task.FromResult(0);
                    })
                );

                var order = GetOrder(registration);
                var paymentMethod = registration.vipps ? "Vipps" : "Kort/Kontant";
                var orderId = "";

                // Vis ordrenummer hvis dette er Vipps.
                if(registration.vipps) {
                    var possibilties = _dbContext.VippsOrders.Where(x => x.registrationid == registration.registrationid).ToList().Last();
                    if(possibilties != null) {
                        orderId = $"<p>Vipps ordernummer: {possibilties.orderid}</p>";
                    }
                }

                var message = new Message
                {
                    Subject = "Du er registrert til vinterleir",
                    Body = new ItemBody
                    {
                        ContentType = BodyType.Html,
                        Content = @$"
                            <h1>Takk for at du registrerte deg til vinterleir!</h1>
                            <p>Hei {registration.Person.firstname} {registration.Person.lastname}, du er herved registrert til Ski Taekwondo Klubbs vinterleir {DateTime.Now.Year}.<p>
                            <p>Her følger en kvittering:<p>
                            <ul>{order}</ul>
                            <p>Betalingsmåte: {paymentMethod}</p>
                            {orderId}
                            <p>For avbestilling, ta kontakt med oss på <a href='mailto: kontakt@skitaekwondo.no'>kontakt@skitaekwondo.no</a></p>
                            <p>Med vennlig hilsen<p>
                            <p>Ski Taekwondo Klubb</p>
                        "
                    },
                    ToRecipients = new List<Recipient>()
                    {
                        new Recipient
                        {
                            EmailAddress = new EmailAddress
                            {
                                Address = registration.Person.email
                            }
                        }
                    }
                };
                

                f.Me.SendMail(message, null).Request().PostAsync().GetAwaiter().GetResult();

                return true;
            }
            catch(Exception e) {
                Console.WriteLine("Klarte ikke levere mail!");
                throw e;
            }
        }
    
    }
}

