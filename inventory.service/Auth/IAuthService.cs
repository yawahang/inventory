using inventory.model;
using System.Threading.Tasks;

namespace inventory.service.Auth
{
    public interface IAuthService
    { 
        Task<object> GenerateToken(MvUser data, bool setExpired = false);
    }
}
