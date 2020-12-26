using inventory.model;
using inventory.service.Account;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using System;
using System.ComponentModel.DataAnnotations;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace inventory.webapi.Controllers
{
    public class AccountController : BaseController
    {
        private readonly IAccountService _accountService;
        private readonly IConfiguration _configuration;
        public AccountController(IAccountService asr, IConfiguration conf)
        {
            _configuration = conf;
            _accountService = asr;
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody][Required] MvLogin json)
        {
            try
            {
                var user = await _accountService.Login(JsonConvert.SerializeObject(json));

                if (user.Error != null)
                {
                    return BadRequest(user.Error);
                }
                else
                {
                    //_protector.Protect(serverName);
                    //_protector.UnProtect(serverName);

                    var claims = new[]
                    {
                            new Claim("User", JsonConvert.SerializeObject(user))
                    };

                    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["ApiKey"]));
                    var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                    var issuer = _configuration.GetSection("Jwt:Issuer").Value;
                    var audience = _configuration.GetSection("Jwt:Audience").Value;
                    var expires = Convert.ToInt32(_configuration.GetSection("Jwt:ExpiryDay").Value);

                    var token = new JwtSecurityToken(
                        issuer: issuer,
                        audience: audience,
                        claims: claims,
                        notBefore: DateTime.Now,
                        expires: DateTime.Now.AddDays(expires),
                        signingCredentials: creds);

                    return Ok(new { token = new JwtSecurityTokenHandler().WriteToken(token) });
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPost, Authorize]
        public void LogOut()
        {

        }
    }
}
