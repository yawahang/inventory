using inventory.model;
using inventory.service.Account;
using inventory.service.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.ComponentModel.DataAnnotations;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;

namespace inventory.webapi.Controllers
{
    public class AccountController : BaseController
    {
        private readonly IAccountService _asr;
        private readonly IAuthService _auth;
        public AccountController(IAccountService asr, IAuthService auth)
        {
            _asr = asr;
            _auth = auth;
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
                    object token = await _auth.GenerateToken(response.Data[0]);
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
                // Set Token as Expired || Maintain token cache and invalidate the tokens after logout method is called
                var handler = new JwtSecurityTokenHandler();
                var token = Request.Headers["Authorization"].ToString().Substring(7);

                if (handler.CanReadToken(token))
                {
                    var usrToken = handler.ReadJwtToken(token);
                    MvUser user = JsonConvert.DeserializeObject<MvUser>(usrToken.Claims.First(a => a.Type == "User").Value);
                    object expiredToken = await _auth.GenerateToken(user, true);
                    return Ok(expiredToken);
                }

                return Ok(token);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
