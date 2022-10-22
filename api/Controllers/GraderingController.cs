using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SkiTKD.Data.Interfaces;
using SkiTKD.Data.Models;

namespace SkiTKD.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GraderingController : ControllerBase
    {
        private readonly ILogger<GraderingController> _logger;
        private readonly IGraderingRepository _graderingRepository;

        public GraderingController(ILogger<GraderingController> logger, IGraderingRepository repo)
        {
            _logger = logger;
            _graderingRepository = repo;
        }

        [HttpPost]
        [Route("Post")]
        public ActionResult<bool> Post(GraderingRegistration reg)
        {
            throw new Exception("Gradering er ikke tilgjenglig.");
            // _graderingRepository.AddRegistrationToExcel(reg, null);
            // _graderingRepository.SendEmail(reg.FirstName, reg.LastName, reg.Email);
            // return true;
        }
    }
}
