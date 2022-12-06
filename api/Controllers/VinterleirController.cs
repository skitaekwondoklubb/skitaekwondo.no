using System.Transactions;
using Microsoft.AspNetCore.Mvc;
using SkiTKD.Data.Interfaces;
using SkiTKD.Data.Models;

namespace SkiTKD.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VinterleirController : ControllerBase
    {
        private readonly ILogger<VinterleirController> _logger;
        private readonly IRegistrationRepository _regRepo;
        private readonly IPersonRepository _personRepo;
        private readonly IVippsRepository _vippsRepo;
        private readonly IPaymentRepository _paymentRepo;
        private readonly ILedsagerRepository _ledsagerRepo;
        private readonly IMailRepository _mailRepo;

        public VinterleirController(
            ILogger<VinterleirController> logger, 
            IPersonRepository personRepo, 
            IRegistrationRepository regRepo, 
            IVippsRepository vippsRepo,
            IPaymentRepository paymentRepo,
            ILedsagerRepository ledsagerRepo,
            IMailRepository mailRepo
        )
        {
            _logger = logger;
            _regRepo = regRepo;
            _personRepo = personRepo;
            _vippsRepo = vippsRepo;
            _paymentRepo = paymentRepo;
            _ledsagerRepo = ledsagerRepo;
            _mailRepo = mailRepo;
        }

        [HttpPost]
        [Route("Post")]
        public async Task<ActionResult<string>> Post(VinterleirRegistration reg)
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

                    _regRepo.AddRegistration(reg, person.personid);

                    var registration = _regRepo.FindRegistration(person.personid);

                    if(reg.Ledsagere.Count > 0) {
                        foreach(var ledsager in reg.Ledsagere) {

                            var savedLedsager = _personRepo.AddPerson(
                                ledsager.FirstName,
                                ledsager.LastName,
                                ledsager.Age,
                                ledsager.Email,
                                ledsager.Telephone  
                            );
                            
                            _ledsagerRepo.AddLedsager(savedLedsager.personid, person.personid, registration.registrationid);
                        }
                    }

                    var existingPayment = _paymentRepo.FindPayment(registration.registrationid);
                    if(existingPayment == null || !(existingPayment.paid) || (existingPayment.cancelled == true)) {
                        var payment = _paymentRepo.AddPayment(registration.registrationid, registration.vipps, _paymentRepo.GetTotal(reg));

                        if(registration.vipps) {
                            var request = await _vippsRepo.VinterleirToVippsRequest(registration.registrationid, person.telephone, payment.paymentid, (int)payment.amount);
                            var url = await _vippsRepo.Payments(request);
                            if(url == null || request?.transaction?.orderId == null) {
                                throw new Exception("Klarte ikke koble til Vipps. OrdreId er NULL");
                            }
                            scope.Complete();
                            return Ok(url);
                        }
                    }
                    _mailRepo.SendMail(registration.registrationid);
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
