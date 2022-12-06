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
        private readonly IMailRepository _mailRepo;

        public VippsController(ILogger<VippsController> logger, IVippsRepository repo, IPaymentRepository paymentRepo, IMailRepository mailRepo)
        {
            _logger = logger;
            _vippsRepo = repo;
            _paymentRepo = paymentRepo;
            _mailRepo = mailRepo;
        }

        [HttpPost]
        [Route("v2/payments/{orderId}")]
        public void PaymentUpdateCallback(string orderId, [FromBody] VippsPaymentCallbackModel orderInfo )
        {
            if(orderInfo.transactionInfo.status == "RESERVED") {
                var order = _vippsRepo.FindVippsOrder(orderId);
                _paymentRepo.SetPaid(order.registrationid);
                _vippsRepo.SetTransactionData(orderId, orderInfo.transactionInfo);
                _mailRepo.SendMail(order.registrationid);
            }
            else if(orderInfo.transactionInfo.status == "CANCELLED") {
                var order = _vippsRepo.FindVippsOrder(orderId);
                _vippsRepo.SetTransactionData(orderId, orderInfo.transactionInfo);
            }
            else if(string.IsNullOrEmpty(orderId)) {
                throw new Exception("Vipps sendte oss ikke en ordreid.");
            }
        }

        [HttpGet]
        [Route("CheckIfVippsOk/{orderId}")]
        public ActionResult<string> CheckIfVippsOk(string orderId)
        {
            var registrationId = _vippsRepo.FindVippsOrder(orderId).registrationid;
            var hasPaid = _paymentRepo.RegistrationHasPaid(registrationId);

            if(!hasPaid) {
                return _vippsRepo.GetStatus(orderId);
            }

            return CallbackStatuses.Reserved;
        }

        [HttpPost]
        [Route("cancel/{orderId}")]
        public void CancelOrder(string orderId)
        {
            var registrationId = _vippsRepo.FindVippsOrder(orderId).registrationid;
            var cancelled = _paymentRepo.CancelPayment(registrationId);
        }     
    }
}
