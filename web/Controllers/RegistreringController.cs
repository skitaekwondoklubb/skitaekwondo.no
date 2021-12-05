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
    public class RegistreringController : ControllerBase
    {
        private readonly ILogger<RegistreringController> _logger;
        private readonly IRegistreringRepository _registreringRepository;

        public RegistreringController(ILogger<RegistreringController> logger, IRegistreringRepository regRepo)
        {
            throw new Exception("Registrering er over.");
            _logger = logger;
            _registreringRepository = regRepo;
        }

        [HttpPost]
        [Route("Post")]
        public async Task<ActionResult<bool>> Post(Registration reg)
        {
            return await _registreringRepository.AddRegistrationToExcel(reg);
        }
    }
}
