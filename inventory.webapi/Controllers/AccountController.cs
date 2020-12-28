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
        private readonly IAccountService _asr;
        private readonly IConfiguration _conf;
        public AccountController(IAccountService asr, IConfiguration conf)
        {
            _conf = conf;
            _asr = asr;
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody][Required] MvLogin json)
        {
            try
            {
                var response = await _asr.Login(JsonConvert.SerializeObject(json));

                if (response.Type == "Error")
                {
                    return BadRequest(response.Text);
                }
                else
                {
                    var claims = new[]
                    {
                            new Claim("data", JsonConvert.SerializeObject(response.Data))
                    };

                    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_conf["ApiKey"]));
                    var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                    var issuer = _conf.GetSection("Jwt:Issuer").Value;
                    var audience = _conf.GetSection("Jwt:Audience").Value;
                    var expires = Convert.ToInt32(_conf.GetSection("Jwt:ExpiryDay").Value);

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
        public void Logout()
        {

        }
    }
}
