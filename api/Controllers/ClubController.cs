using System.Transactions;
using Microsoft.AspNetCore.Mvc;
using SkiTKD.Data.Dto;
using SkiTKD.Data.Interfaces;
using SkiTKD.Data.Models;

namespace SkiTKD.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ClubController : ControllerBase
    {
        private readonly ILogger<ClubController> _logger;
        private readonly IClubRepository _clubRepo;

        public ClubController(
            ILogger<ClubController> logger, 
            IClubRepository clubRepo
        )
        {
            _logger = logger;
            _clubRepo = clubRepo;
        }

        [HttpGet]
        [Route("Get")]
        public ActionResult<List<ClubDto>> Get()
        {
            var allClubs = _clubRepo.GetAllClubs();
            List<ClubDto> clubs = new List<ClubDto>();
            foreach (var club in allClubs)
            {
                clubs.Add(new ClubDto {
                    ClubId = club.clubid,
                    Name = club.name
                });
            }
            
            return Ok(clubs);
        }
    }
}
