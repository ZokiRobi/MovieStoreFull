using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Movies.API.Data;
using Movies.API.Dtos;
using Movies.API.Models;

namespace Movies.API.Controllers
{
    [Route("api/[controller]")]
    public class AuthController : Controller
    {
        private readonly IAuthRepository repository;
        private readonly IConfiguration config;
        public AuthController(IAuthRepository repository, IConfiguration config)
        {
            this.config = config;
            this.repository = repository;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto dto)
        {
            if(dto == null)
            return BadRequest();
            dto.Username = dto.Username.ToLower();
            if (await repository.UsernameExists(dto.Username))
                ModelState.AddModelError("Username", "Username exists. Must be unique.");

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = new User { Username = dto.Username , Role = ""};

            user = await repository.Register(user, dto.Password);

            return StatusCode(201);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto dto)
        {

            var user = await repository.Login(dto.Username, dto.Password);
            var errorForInvalidLogin = "Invalid Username or Password";
            if (user == null)
                return BadRequest(new{errorForInvalidLogin});

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(config.GetSection("AppSettings:Token").Value);
            var tokenDescription = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
               {
                   new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                   new Claim(ClaimTypes.Name, user.Username),
                   new Claim(ClaimTypes.Role, user.Role)
               }),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key)
               , SecurityAlgorithms.HmacSha512Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescription);
            var tokenString = tokenHandler.WriteToken(token);

            return Ok(new { tokenString , user});
        }
    }
}