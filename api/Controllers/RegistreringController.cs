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
    public class RegistreringController : ControllerBase
    {
        private readonly ILogger<RegistreringController> _logger;
        private readonly IRegistreringRepository _registreringRepository;

        public RegistreringController(ILogger<RegistreringController> logger)
        {
            _logger = logger;
        }

        [HttpPost]
        public async Task<ActionResult<bool>> Post(Registration reg)
        {
            return await _registreringRepository.AddRegistrationToExcel(reg);
        }
    }
}
