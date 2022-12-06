using System.Transactions;
using Microsoft.AspNetCore.Mvc;
using SkiTKD.Data.Dto;
using SkiTKD.Data.Interfaces;
using SkiTKD.Data.Models;

namespace SkiTKD.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GradeController : ControllerBase
    {
        private readonly ILogger<GradeController> _logger;
        private readonly IGradeRepository _gradeRepo;

        public GradeController(
            ILogger<GradeController> logger, 
            IGradeRepository gradeRepo
        )
        {
            _logger = logger;
            _gradeRepo = gradeRepo;
        }

        [HttpGet]
        [Route("Get")]
        public ActionResult<List<GradeDto>> Get()
        {
            var allGrades = _gradeRepo.GetAllGrades();
            List<GradeDto> grades = new List<GradeDto>();
            foreach (var grade in allGrades)
            {
                grades.Add(new GradeDto {
                    Grade = grade.grade,
                    GradeId = grade.gradeid,
                    isDan = grade.isdan,
                    Name = grade.name
                });
            }

            return Ok(grades);
        }
    }
}
