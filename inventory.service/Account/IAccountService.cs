using inventory.model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace inventory.service.Account
{
    public interface IAccountService
    {
        /// <summary>
        /// Get User
        /// </summary>
        /// <returns>User Detail</returns>
        Task<MvResponse<List<MvUser>>> Login(MvLoginParam json);
    }
}
