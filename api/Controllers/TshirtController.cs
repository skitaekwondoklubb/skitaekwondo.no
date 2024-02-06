using System.Transactions;
using Microsoft.AspNetCore.Mvc;
using SkiTKD.Data.Interfaces;
using SkiTKD.Data.Models;
using SkiTKD.Data.Repositories;

namespace SkiTKD.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OtherController : ControllerBase
    {
        private readonly ILogger<OtherController> _logger;
        private readonly IOtherRepository _OtherRepository;
        private readonly IPersonRepository _personRepo;
        private readonly IVippsRepository _vippsRepo;
        private readonly IPaymentRepository _paymentRepo;
        private readonly IMailRepository _mailRepo;


        public OtherController(
            ILogger<OtherController> logger, 
            IOtherRepository repo,
            IPersonRepository personRepo, 
            IVippsRepository vippsRepo,
            IPaymentRepository paymentRepo,
            IMailRepository mailRepo
        )
        {
            throw new Exception("T-skjorte salget er over.");
            _logger = logger;
            _OtherRepository = repo;
            _personRepo = personRepo;
            _vippsRepo = vippsRepo;
            _paymentRepo = paymentRepo;
            _mailRepo = mailRepo;
        }

        [HttpPost]
        [Route("Post")]
        public async Task<ActionResult<string>> Post(OtherRegistration reg)
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

                    var registration = _OtherRepository.AddRegistration(reg, person.personid);

                    if(registration.Person == null){
                        throw new Exception("PERSON ER NULL");
                    }

                    var payment = _paymentRepo.AddPayment(
                        registration, 
                        reg.Vipps, 
                        registration.Person.lastname.ToLower() == "test" ? 10 : ((reg.Tshirts.Count() - 1) * 160 ) // People with "Test" as name gets 10kr instead.
                    );


                    if(reg.Vipps) {
                        var request = await _vippsRepo.VippsRequest(registration.registrationid, person.telephone, payment.paymentid, (int)payment.amount, "45-års jubileum T-skjorte", "vipps/tshirt");
                        var url = await _vippsRepo.Payments(request);
                        if(url == null || request?.transaction?.orderId == null) {
                            throw new Exception("Klarte ikke koble til Vipps. OrdreId er NULL");
                        }
                        scope.Complete();
                        return Ok(url);
                    }

                    //_mailRepo.SendMail(registration);

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
