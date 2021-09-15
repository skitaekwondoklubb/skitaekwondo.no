using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SkiTKD.Data.Interfaces;
using SkiTKD.Data.Models;

namespace SkiTKD.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class VinterleirController : ControllerBase
    {
        private readonly ILogger<VinterleirController> _logger;
        private readonly IVinterleirRepository _vinterleirRepository;

        public VinterleirController(ILogger<VinterleirController> logger)
        {
            _logger = logger;
        }

        [HttpPost]
        public ActionResult<bool> Post(VinterleirRegistration reg)
        {
            _vinterleirRepository.AddRegistrationToExcel(reg);
            return true;
        }
    }
}
