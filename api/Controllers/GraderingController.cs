using System.Transactions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SkiTKD.Data.Interfaces;
using SkiTKD.Data.Models;
using SkiTKD.Data.Repositories;

namespace SkiTKD.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GraderingController : ControllerBase
    {
        private readonly ILogger<GraderingController> _logger;
        private readonly IGraderingRepository _graderingRepository;
        private readonly IPersonRepository _personRepo;
        private readonly IVippsRepository _vippsRepo;
        private readonly IPaymentRepository _paymentRepo;
        private readonly IMailRepository _mailRepo;


        public GraderingController(
            ILogger<GraderingController> logger, 
            IGraderingRepository repo,
            IPersonRepository personRepo, 
            IVippsRepository vippsRepo,
            IPaymentRepository paymentRepo,
            IMailRepository mailRepo
        )
        {
            _logger = logger;
            _graderingRepository = repo;
            _personRepo = personRepo;
            _vippsRepo = vippsRepo;
            _paymentRepo = paymentRepo;
            _mailRepo = mailRepo;
        }

        [HttpPost]
        [Route("Post")]
        public async Task<ActionResult<string>> Post(GraderingRegistration reg)
        {
            throw new Exception("Gradering er ikke tilgjenglig.");
            using(TransactionScope scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled)) {
                try {
                    var person = _personRepo.AddPerson(
                        reg.FirstName,
                        reg.LastName,
                        reg.Age,
                        reg.Email,
                        reg.Telephone
                    );

                    var registration = _graderingRepository.AddRegistration(reg, person.personid);

                    if(registration.Person == null){
                        throw new Exception("PERSON ER NULL");
                    }

                    var existingPayment = registration.Payment;
                    if(existingPayment == null || !(existingPayment.paid) || (existingPayment.cancelled == true)) {
                        var payment = _paymentRepo.AddPayment(
                            registration, 
                            reg.Vipps, 
                            registration.Person.lastname.ToLower() == "test" ? 10 : PaymentRepository.GetTotalGradering // People with "Test" as name gets 10kr instead.
                        );


                        if(reg.Vipps) {
                            var request = await _vippsRepo.VippsRequest(registration.registrationid, person.telephone, payment.paymentid, (int)payment.amount, "Gradering for utøver");
                            var url = await _vippsRepo.Payments(request);
                            if(url == null || request?.transaction?.orderId == null) {
                                throw new Exception("Klarte ikke koble til Vipps. OrdreId er NULL");
                            }
                            scope.Complete();
                            return Ok(url);
                        }
                    }

                    _mailRepo.SendMail(registration);

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
