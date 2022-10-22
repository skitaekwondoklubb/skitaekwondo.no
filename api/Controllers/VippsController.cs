using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SkiTKD.Data.Interfaces;
using SkiTKD.Data.Models;
using System.Linq;

namespace SkiTKD.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VippsController : ControllerBase
    {
        private readonly ILogger<VippsController> _logger;
        private readonly IVippsRepository _vippsRepo;
        private readonly IPaymentRepository _paymentRepo;

        public VippsController(ILogger<VippsController> logger, IVippsRepository repo, IPaymentRepository paymentRepo)
        {
            _logger = logger;
            _vippsRepo = repo;
            _paymentRepo = paymentRepo;
        }

        [HttpPost]
        [Route("v2/payments/{orderId}")]
        public void PaymentUpdateCallback(string orderId, [FromBody] VippsPaymentCallbackModel orderInfo )
        {
            if(orderInfo.transactionInfo.status == "RESERVED") {
                var order = _vippsRepo.FindVippsOrder(orderId);
                _paymentRepo.SetPaid(order.RegistrationId);
                _vippsRepo.SetTransactionData(orderId, orderInfo.transactionInfo);

            }
            else if(string.IsNullOrEmpty(orderId)) {
                throw new Exception("Vipps sendte oss ikke en ordreid.");
            }
        }

        [HttpGet]
        [Route("CheckIfVippsOk/{orderId}")]
        public ActionResult<bool> CheckIfVippsOk(string orderId)
        {
            var registrationId = _vippsRepo.FindVippsOrder(orderId).RegistrationId;
            var hasPaid = _paymentRepo.RegistrationHasPaid(registrationId);
            
            return hasPaid;
        }

        [HttpPost]
        [Route("cancel/{orderId}")]
        public void CancelOrder(string orderId)
        {
            var registrationId = _vippsRepo.FindVippsOrder(orderId).RegistrationId;
            var cancelled = _paymentRepo.CancelPayment(registrationId);
            if(cancelled) {
                
            }
        }     
    }
}
