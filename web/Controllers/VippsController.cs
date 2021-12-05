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
        private readonly IVinterleirRepository _vinterleirRepo;

        public VippsController(ILogger<VippsController> logger, IVippsRepository repo, IVinterleirRepository vinterleirRepo)
        {
            throw new Exception("Vinterleir er over.");
            _logger = logger;
            _vippsRepo = repo;
            _vinterleirRepo = vinterleirRepo;
        }

        [HttpPost]
        [Route("BetalMedVipps")]
        public ActionResult<string> BetalMedVipps(VinterleirRegistration reg)
        {
            var request = _vippsRepo.VinterleirToVippsRequest(reg, _vinterleirRepo.GetTotal(reg)).GetAwaiter().GetResult(); // Should be awaited.
            var url = _vippsRepo.Payments(request).GetAwaiter().GetResult();
            if(url == null || request?.transaction?.orderId == null) {
                throw new Exception("Klarte ikke koble til Vipps. OrdreId er NULL");
            }
            
            _vinterleirRepo.AddRegistrationToExcel(reg, request.transaction.orderId).GetAwaiter().GetResult();
            
            return url;
        }

        [HttpPost]
        [Route("v2/payments/{orderId}")]
        public void PaymentUpdateCallback(string orderId, [FromBody] VippsPaymentCallbackModel orderInfo )
        {
            if(orderInfo.transactionInfo.status == "RESERVED") {
                var possibleExcels = _vinterleirRepo.ReadFromExcel().GetAwaiter().GetResult();
                
                var user = possibleExcels.People.SingleOrDefault(x => x.VippsOrderId.ToLower() == orderId.ToLower());
                if(user == null) {
                    throw new Exception($"Fant ikke ordreid i våre data? Ta kontakt med oss med din ordreid ({orderId}) så skal vi dobbeltsjekke. ");
                }

                _vinterleirRepo.UpdatePaidStatus(user);
            }
            else if(string.IsNullOrEmpty(orderId)) {
                throw new Exception("Vipps sendte oss ikke en ordreid.");
            }
        }

        [HttpGet]
        [Route("CheckIfVippsOk/{orderId}")]
        public ActionResult<bool> CheckIfVippsOk(string orderId)
        {
            var possibleExcels = _vinterleirRepo.ReadFromExcel().GetAwaiter().GetResult();
            var user = possibleExcels.People.SingleOrDefault(x => x.VippsOrderId.ToLower() == orderId.ToLower());
            if(user.HasPaid.Equals("Ja")) {
                _vinterleirRepo.SendEmail(user.FirstName, user.LastName, user.Email);
                return true;
            }
            
            return false;
        }

        [HttpPost]
        [Route("cancel/{orderId}")]
        public void CancelOrder(string orderId)
        {
            var possibleExcels = _vinterleirRepo.ReadFromExcel().GetAwaiter().GetResult();
            
            var user = possibleExcels.People.SingleOrDefault(x => x.VippsOrderId.ToLower() == orderId.ToLower());
            if(user == null) {
                throw new Exception($"Fant ikke ordreid i våre data? Ta kontakt med oss med din ordreid ({orderId}) så skal vi dobbeltsjekke.");
            }
            _vinterleirRepo.DeleteRow(user);
        }     
    }
}
