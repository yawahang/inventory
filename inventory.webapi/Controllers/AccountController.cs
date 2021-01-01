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
using System.Linq;
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
        public async Task<IActionResult> Login([FromBody][Required] MvPost json)
        {
            try
            {
                var response = await _asr.Login(JsonConvert.SerializeObject(json.Json));

                if (response.Type == "Error")
                {
                    return Ok(response.Text);
                }
                else
                {
                    object token = await GenerateJwtToken(response.Data[0]);
                    return Ok(token);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Logout()
        {
            try
            {
                // Set Token as Expired OR Maintain token cache and invalidate the tokens after logout method is called
                var handler = new JwtSecurityTokenHandler();
                var token = Request.Headers["Authorization"].ToString().Substring(7);

                if (handler.CanReadToken(token))
                {
                    var usrToken = handler.ReadJwtToken(token);
                    MvUser user = JsonConvert.DeserializeObject<MvUser>(usrToken.Claims.First(a => a.Type == "User").Value);
                    object expiredToken = await GenerateJwtToken(user, true);
                    return Ok(expiredToken);
                }

                return Ok(token);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        private async Task<object> GenerateJwtToken(MvUser data, bool setExpired = false)
        {
            var claims = new[]
                    {
                        new Claim("User", JsonConvert.SerializeObject(data))
                    };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_conf["ApiKey"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var issuer = _conf.GetSection("Jwt:Issuer").Value;
            var audience = _conf.GetSection("Jwt:Audience").Value;
            var expires = setExpired ? 0 : Convert.ToInt32(_conf.GetSection("Jwt:ExpiryDay").Value);

            var token = new JwtSecurityToken(
                issuer: issuer,
                audience: audience,
                claims: claims,
                notBefore: DateTime.Now,
                expires: DateTime.Now.AddDays(expires),
                signingCredentials: creds);

            return await Task.FromResult(new { token = new JwtSecurityTokenHandler().WriteToken(token) });
        }
    }
}
