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

        [HttpGet]
        [Route("Get")]
        public ActionResult<List<AdminRegistrationDto>> Get(string token)
        {
            if(pw == token) {

            }
            var allPeople = _regRepo.GetUsers();
            return Ok(allPeople);
        }
        
        [HttpGet]
        [Route("GetToken")]
        public ActionResult<string> GetToken(string username, string password)
        {
            if(username == usr && password == pw) {
                var hasher = SHA256.Create();
                var tokenBytes = hasher.ComputeHash(Encoding.ASCII.GetBytes($"{password}{username}"));
                return Ok(Encoding.ASCII.GetString(tokenBytes));
            }
            return Unauthorized();
        }
    }
}
