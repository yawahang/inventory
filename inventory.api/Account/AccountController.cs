using inventory.api.Base;
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

namespace inventory.api.Account
{
    public class AccountController : BaseController
    {
        private readonly IAccountService _accountService;
        private readonly IConfiguration _configuration;
        public AccountController(IAccountService accountService, IConfiguration configuration)
        {
            _configuration = configuration;
            _accountService = accountService;
        }

        [HttpPost]
        [AllowAnonymous]
        public IActionResult Login([FromBody][Required] MvLogin json)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid Request!");
            }

            try
            {
                var user = _accountService.Login(JsonConvert.SerializeObject(json));

                var claims = new[]
                {
                            new Claim("User", JsonConvert.SerializeObject(user.Result.Json))
                };

                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
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
