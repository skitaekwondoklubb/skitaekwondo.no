using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Transactions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
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


        public VinterleirController(
            ILogger<VinterleirController> logger, 
            IPersonRepository personRepo, 
            IRegistrationRepository regRepo, 
            IVippsRepository vippsRepo,
            IPaymentRepository paymentRepo
        )
        {
            _logger = logger;
            _regRepo = regRepo;
            _personRepo = personRepo;
            _vippsRepo = vippsRepo;
            _paymentRepo = paymentRepo;
        }

        [HttpPost]
        [Route("Post")]
        public async Task<ActionResult<string>> Post(VinterleirRegistration reg)
        {
            using(TransactionScope scope = new TransactionScope()) {
                var person = _personRepo.AddPerson(new Person {
                    FirstName = reg.FirstName,
                    LastName = reg.LastName,
                    Age = reg.Age,
                    Email = reg.Email,
                    Telephone = reg.Telephone
                });

                var registration = _regRepo.AddRegistration(reg, person);
                var payment = _paymentRepo.AddPayment(registration.RegistrationId, registration.Vipps, _paymentRepo.GetTotal(reg));

                if(registration.Vipps) {
                    var request = await _vippsRepo.VinterleirToVippsRequest(registration, (int)payment.Amount);
                    var url = await _vippsRepo.Payments(request);
                    if(url == null || request?.transaction?.orderId == null) {
                        throw new Exception("Klarte ikke koble til Vipps. OrdreId er NULL");
                    }
                    
                    return Ok(url);
                }
            }

            return Ok("Done");
        }
    }
}
