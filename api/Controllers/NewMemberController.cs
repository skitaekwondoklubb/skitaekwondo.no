using System.Transactions;
using Azure.Communication.Email;
using Microsoft.AspNetCore.Mvc;
using SkiTKD.Data.Interfaces;
using SkiTKD.Data.Models;
using SkiTKD.Data.Repositories;

namespace SkiTKD.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NewMemberController : ControllerBase
    {
        private readonly ILogger<NewMemberController> _logger;
        private readonly INewMemberRepository _newMemberRepository;
        private readonly IPersonRepository _personRepo;
        private readonly IMailRepository _mailRepo;

        public NewMemberController(
            ILogger<NewMemberController> logger, 
            INewMemberRepository repo,
            IPersonRepository personRepo, 
            IMailRepository mailRepo
        )
        {
            _logger = logger;
            _newMemberRepository = repo;
            _personRepo = personRepo;
            _mailRepo = mailRepo;
        }

        [HttpPost]
        [Route("Post")]
        public async Task<ActionResult<string>> Post(NewMemberRegistration reg)
        {
            using(TransactionScope scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled)) {
                try {
                    var person = _personRepo.AddPerson(
                        reg.FirstName,
                        reg.LastName,
                        reg.Age,
                        reg.Email,
                        reg.Telephone
                    );

                    var registration = _newMemberRepository.AddRegistration(reg, person.personid);

                    if(registration.Person == null){
                        throw new Exception("PERSON ER NULL");
                    }

                    var email = new List<EmailAddress>(){ new EmailAddress(registration.Person.email)};
                    var toAdminsEmail = new List<EmailAddress>(){ new EmailAddress("kontakt@skitaekwondo.no"), new EmailAddress("leder@skitaekwondo.no")};

                    if(Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") != "Development") {
                        _mailRepo.SendMail(email, new EmailContent("Invitasjon til Ski Taekwondo Klubb.") {
                            Html = Emails.Oppstartsmail(registration),
                            PlainText = Emails.Oppstartsmail_Plaintext(registration)
                        });

                        _mailRepo.SendMail(toAdminsEmail, new EmailContent($"Nytt medlem: {registration.Person.firstname} {registration.Person.lastname}") {
                            Html = Emails.Oppstartsmail(registration),
                            PlainText = Emails.Oppstartsmail_Plaintext(registration)
                        });
                    }

                    scope.Complete();
                }
                catch(Exception e) {
                    scope.Dispose();
                    _logger.LogError(e, "Error while posting new NewMemberRegistration.");
                    throw e;
                }
                scope.Dispose();
            }

            return Ok("Done");
        }
    }
}
