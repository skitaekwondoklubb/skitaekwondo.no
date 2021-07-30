using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace SkiTKD.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class VinterleirController : ControllerBase
    {
        private readonly ILogger<VinterleirController> _logger;

        public VinterleirController(ILogger<VinterleirController> logger)
        {
            _logger = logger;
        }

        [HttpPost]
        public ActionResult<bool> Post()
        {
            return Ok(true);
        }
    }
}
