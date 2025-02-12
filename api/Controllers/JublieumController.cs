using System.Transactions;
using Microsoft.AspNetCore.Mvc;
using SkiTKD.Data.Interfaces;
using SkiTKD.Data.Models;
using SkiTKD.Data.Repositories;

namespace SkiTKD.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class JubileumController : ControllerBase
    {
        private readonly ILogger<JubileumController> _logger;
        private readonly IJubileumRepository _jubileumRepository;
        private readonly IPersonRepository _personRepo;
        private readonly IVippsRepository _vippsRepo;
        private readonly IPaymentRepository _paymentRepo;
        private readonly IMailRepository _mailRepo;

        public JubileumController(
            ILogger<JubileumController> logger, 
            IJubileumRepository repo,
            IPersonRepository personRepo, 
            IVippsRepository vippsRepo,
            IPaymentRepository paymentRepo,
            IMailRepository mailRepo
        )
        {
            _logger = logger;
            _jubileumRepository = repo;
            _personRepo = personRepo;
            _vippsRepo = vippsRepo;
            _paymentRepo = paymentRepo;
            _mailRepo = mailRepo;
        }

        [HttpPost]
        [Route("Post")]
        public async Task<ActionResult<string>> Post(JubileumRegistration reg)
        {
            using(TransactionScope scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled)) {
                try {
                   
                    var registration = _jubileumRepository.AddRegistration(reg.FirstName, reg.LastName, reg.Adult, reg.Child);

                    if(registration.firstname == null || registration.lastname == null){
                        throw new Exception("PERSON ER NULL");
                    }

                    scope.Complete();
                }
                catch(Exception e) {
                    scope.Dispose();
                    throw e;
                }
                
                scope.Dispose();
            }

            return Ok("Done");
        }
    }
}
