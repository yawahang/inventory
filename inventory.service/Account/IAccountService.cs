using inventory.model;
using System.Threading.Tasks;

namespace inventory.service.Account
{
    public interface IAccountService
    {
        /// <summary>
        /// Get User
        /// </summary>
        /// <returns>User Detail</returns>
        Task<MvResponse<MvUser>> Login(string json);
    }
}
