using inventory.service.Data;
using Microsoft.AspNetCore.Http;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;

namespace inventory.service.Base
{
    public class BaseService : IBaseService
    {
        public BaseService(IHttpContextAccessor httpContextAccessor, IDataService ds)
        {
            var accessor = httpContextAccessor;
            int UserId = 0;
            string Role = string.Empty;
            string token = "";
            if (accessor.HttpContext != null)
                token = accessor.HttpContext.Request.Headers["Authorization"].ToString();
            if (token != null && token != "")
            {
                var jwt = new JwtSecurityToken(token.Substring(7));
                int.TryParse(jwt.Claims.First(claim => claim.Type == "UserId").Value, out UserId);
                Role = jwt.Claims.First(claim => claim.Type == "Role").Value;
            }

            ds.CurrentUserId = UserId;
            ds.Role = Role;
        }
    }
}
