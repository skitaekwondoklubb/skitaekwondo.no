using System.Transactions;
using Microsoft.AspNetCore.Mvc;
using SkiTKD.Data.Dto;
using SkiTKD.Data.Interfaces;
using SkiTKD.Data.Models;

namespace SkiTKD.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VinterleirUsersController : ControllerBase
    {
        private readonly ILogger<VinterleirUsersController> _logger;
        private readonly IVinterleirRegistrationRepository _regRepo;

        public VinterleirUsersController(
            ILogger<VinterleirUsersController> logger, 
            IVinterleirRegistrationRepository regRepo
        )
        {
            _logger = logger;
            _regRepo = regRepo;
        }

        [HttpGet]
        [Route("Get")]
        public ActionResult<List<PublicRegistrationDto>> Get()
        {
            var allPeople = _regRepo.GetAllPublicRegistrations();
            return Ok(allPeople);
        }

        [HttpGet]
        [Route("GetGrades")]
        public ActionResult<List<PublicGradeDto>> GetGrades()
        {
            var allPeople = _regRepo.GetGradeNumbers();
            return Ok(allPeople);
        }
    }
}
