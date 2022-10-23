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

        public VinterleirController(
            ILogger<VinterleirController> logger, 
            IPersonRepository personRepo, 
            IRegistrationRepository regRepo, 
            IVippsRepository vippsRepo,
            IPaymentRepository paymentRepo,
            ILedsagerRepository ledsagerRepo
        )
        {
            _logger = logger;
            _regRepo = regRepo;
            _personRepo = personRepo;
            _vippsRepo = vippsRepo;
            _paymentRepo = paymentRepo;
            _ledsagerRepo = ledsagerRepo;
        }

        [HttpPost]
        [Route("Post")]
        public async Task<ActionResult<string>> Post(VinterleirRegistration reg)
        {
            using(TransactionScope scope = new TransactionScope()) {
                var person = _personRepo.AddPerson(
                    reg.FirstName,
                    reg.LastName,
                    reg.Age,
                    reg.Email,
                    reg.Telephone
                );

                var registration = _regRepo.AddRegistration(reg, person.personid);

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

                var payment = _paymentRepo.AddPayment(registration.registrationid, registration.vipps, _paymentRepo.GetTotal(reg));

                if(registration.vipps) {
                    var request = await _vippsRepo.VinterleirToVippsRequest(registration, (int)payment.amount);
                    var url = await _vippsRepo.Payments(request);
                    if(url == null || request?.transaction?.orderId == null) {
                        throw new Exception("Klarte ikke koble til Vipps. OrdreId er NULL");
                    }
                    scope.Complete();
                    
                    return Ok(url);
                }
                scope.Complete();
            }

            return Ok("Done");
        }
    }
}
