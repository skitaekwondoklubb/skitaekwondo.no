using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.Graph;
using SkiTKD.Data.Entities;
using SkiTKD.Data.Interfaces;

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

        public MailRepository(IConfiguration config, IGraphTokenService graphToken, SkiTKDContext dbContext, IRegistrationRepository regRepo) {
            clientId = config["ClientId"];
            user = config["ExcelUser"];
            path = config["VinterleirPath"];
            password = config["Pass"];
            _tokenService = graphToken;
            _dbContext = dbContext;
            _regRepo = regRepo;
        }

        public bool SendMail(int registrationId) {
           var registration = _dbContext.Registrations.Single(x => x.registrationid == registrationId);

            SendMailToRecipient(registration.Person.email, registration.Person.firstname, registration.Person.lastname);

            registration.mailesent = true;
            _dbContext.SaveChanges();
            return false;
        }

        private bool SendMailToRecipient(string email, string firstname, string lastname) {
              try {
                var f = new GraphServiceClient(
                new DelegateAuthenticationProvider(
                    (requestMessage) =>
                    {
                        requestMessage.Headers.Authorization = new AuthenticationHeaderValue("bearer", _tokenService.GetToken().GetAwaiter().GetResult());
                        return Task.FromResult(0);
                    })
                );

                var message = new Message
                {
                    Subject = "Du er herved registrert til vinterleir",
                    Body = new ItemBody
                    {
                        ContentType = BodyType.Html,
                        Content = @$"
                            <h1>Takk for at du registrerte deg til vinterleir!</h1>
                            <p>Hei {firstname} {lastname}, du er herved registrert til Ski Taekwondo Klubbs vinterleir 2021.<p>
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
                                Address = email
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

