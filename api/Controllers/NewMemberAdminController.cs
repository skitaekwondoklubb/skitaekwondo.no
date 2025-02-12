using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using SkiTKD.Data.Dto;
using SkiTKD.Data.Interfaces;

namespace SkiTKD.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NewMemberAdminController : ControllerBase
    {
        private readonly string pw;
        private readonly ILogger<NewMemberAdminController> _logger;
        private readonly INewMemberRepository _regRepo;

        public NewMemberAdminController(
            IConfiguration config,
            ILogger<NewMemberAdminController> logger, 
            INewMemberRepository regRepo
        )
        {
            pw = config["PWNewMember"];
            _logger = logger;
            _regRepo = regRepo;
        }

        private string ConstructToken(string pass) {
            using(var hasher = SHA256.Create()) {
                var tokenBytes = hasher.ComputeHash(Encoding.UTF8.GetBytes($"{pass}{DateTime.Now.Month}{DateTime.Now.Year}--"));
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
            if(ConstructToken(pw) == token) {
                var allPeople = _regRepo.GetAllNewMembers();
                return Ok(allPeople);
            }

            return Unauthorized();
        }

        [HttpGet]
        [Route("GetCsv/{token}")]
        public ActionResult<string> GetCsv(string token)
        {
            if(ConstructToken(pw) == token) {
                var allPeople = _regRepo.ExportToCsv();
                return Ok(allPeople);
            }
            return Unauthorized();
        }
        
        [HttpGet]
        [Route("GetToken/{password}")]
        public ActionResult<string> GetToken(string password)
        {
            if(password == pw) {
               string token = ConstructToken(pw);
               return Ok(token);
            }
            return Unauthorized();
        }

        [HttpDelete]
        [Route("Remove/{id}/{token}")]
        public ActionResult Remove(int id, string token)
        {
            if(ConstructToken(pw) == token) {
                var success = _regRepo.Remove(id);
                return success ? Ok() : UnprocessableEntity();
            }
            return Unauthorized();
        }
    }
}
