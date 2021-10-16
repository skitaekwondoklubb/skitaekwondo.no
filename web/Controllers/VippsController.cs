using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SkiTKD.Data.Interfaces;
using SkiTKD.Data.Models;

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
            _logger = logger;
            _vippsRepo = repo;
            _vinterleirRepo = vinterleirRepo;
        }

        [HttpPost]
        [Route("BetalMedVipps")]
        public ActionResult<string> BetalMedVipps(VinterleirRegistration reg)
        {
            var request = _vippsRepo.VinterleirToVippsRequest(reg).GetAwaiter().GetResult(); // Should be awaited.
            var url = _vippsRepo.Payments(request).GetAwaiter().GetResult();
            if(url == null || request?.transaction?.orderId == null) {
                throw new Exception("Klarte ikke koble til Vipps. OrdreId er NULL");
            }
            
            _vinterleirRepo.AddRegistrationToExcel(reg, request.transaction.orderId).GetAwaiter().GetResult();
            
            return url;
        }

        [HttpPost]
        [Route("v2/payments/{orderId}")]
        public ActionResult<bool> PaymentUpdateCallback(string orderId, [FromBody] VippsPaymentCallbackModel orderInfo )
        {
            if(orderInfo.transactionInfo.status == "RESERVED") {
                // Accept order.
            }

            return true;
        }
    }
}
