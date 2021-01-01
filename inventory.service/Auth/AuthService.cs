using inventory.model;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace inventory.service.Auth
{
    public class AuthService : IAuthService
    {
        private readonly IConfiguration _conf;
        public AuthService(IConfiguration conf)
        {
            _conf = conf;
        }

        public async Task<object> GenerateToken(MvUser data, bool setExpired = false)
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
