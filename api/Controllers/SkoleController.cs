using System.Transactions;
using Microsoft.AspNetCore.Mvc;
using SkiTKD.Data.Interfaces;
using SkiTKD.Data.Models;
using SkiTKD.Data.Repositories;

namespace SkiTKD.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SkoleController : ControllerBase
    {
        private readonly ILogger<SkoleController> _logger;
        private readonly ISkoleRepository _skoleRepository;
        private readonly IPersonRepository _personRepo;
        private readonly IMailRepository _mailRepo;

        public SkoleController(
            ILogger<SkoleController> logger, 
            ISkoleRepository repo,
            IPersonRepository personRepo, 
            IVippsRepository vippsRepo,
            IPaymentRepository paymentRepo,
            IMailRepository mailRepo
        )
        {
            _logger = logger;
            _skoleRepository = repo;
            _personRepo = personRepo;
            _mailRepo = mailRepo;
        }

        [HttpPost]
        [Route("Post")]
        public async Task<ActionResult<string>> Post(SkoleRegistration reg)
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

                    var registration = _skoleRepository.AddRegistration(reg, person.personid);

                    if(registration.Person == null){
                        throw new Exception("PERSON ER NULL");
                    }

                    // _mailRepo.SendMail(registration);

                    scope.Complete();
                }
                catch(Exception e) {
                    scope.Dispose();
                    _logger.LogError(e, "Error while posting new SkoleRegistration.");
                    throw e;
                }
                scope.Dispose();
            }

            return Ok("Done");
        }
    }
}
