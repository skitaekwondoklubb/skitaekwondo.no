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
    public class VinterleirController : ControllerBase
    {
        private readonly ILogger<VinterleirController> _logger;
        private readonly IVinterleirRepository _vinterleirRepository;

        public VinterleirController(ILogger<VinterleirController> logger, IVinterleirRepository repo)
        {
            throw new Exception("Vinterleir er over.");
            _logger = logger;
            _vinterleirRepository = repo;
        }

        [HttpPost]
        [Route("Post")]
        public ActionResult<bool> Post(VinterleirRegistration reg)
        {
            _vinterleirRepository.AddRegistrationToExcel(reg, null);
            _vinterleirRepository.SendEmail(reg.FirstName, reg.LastName, reg.Email);
            return true;
        }
    }
}
