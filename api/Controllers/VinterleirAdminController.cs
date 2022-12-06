using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using SkiTKD.Data.Dto;
using SkiTKD.Data.Interfaces;

namespace SkiTKD.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VinterleirAdminController : ControllerBase
    {
        private readonly string usr;
        private readonly string pw;
        private readonly ILogger<VinterleirAdminController> _logger;
        private readonly IVinterleirAdminRepository _regRepo;

        public VinterleirAdminController(
            IConfiguration config,
            ILogger<VinterleirAdminController> logger, 
            IVinterleirAdminRepository regRepo
        )
        {
            usr = config["AdminUser"];
            pw = config["AdminPW"];
            _logger = logger;
            _regRepo = regRepo;
        }

        private string ConstructToken(string username, string pass) {
            using(var hasher = SHA256.Create()) {
                var tokenBytes = hasher.ComputeHash(Encoding.UTF8.GetBytes($"{pass}{username}{DateTime.Now.DayOfYear}{DateTime.Now.Year}"));
                var build = new StringBuilder();
                foreach (byte x in tokenBytes)
                    build.Append(x.ToString("X2"));
                return build.ToString();
            }
        }

        [HttpGet]
        [Route("Get/{token}")]
        public ActionResult<List<AdminRegistrationDto>> Get(string token)
        {
            if(ConstructToken(usr, pw) == token) {
                var allPeople = _regRepo.GetUsers();
                return Ok(allPeople);
            }
            return Unauthorized();
        }

        [HttpGet]
        [Route("GetCsv/{token}")]
        public ActionResult<string> GetCsv(string token)
        {
            if(ConstructToken(usr, pw) == token) {
                var allPeople = _regRepo.ExportToCsv();
                return Ok(allPeople);
            }
            return Unauthorized();
        }
        
        [HttpGet]
        [Route("GetToken/{username}/{password}")]
        public ActionResult<string> GetToken(string username, string password)
        {
            if(username == usr && password == pw) {
               string token = ConstructToken(usr, pw);
               return Ok(token);
            }
            return Unauthorized();
        }
    }
}
