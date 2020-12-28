using inventory.model;
using System.Threading.Tasks;

namespace inventory.service.Account
{
    public interface IAccountService
    {
        /// <summary>
        /// Get User
        /// </summary>
        /// <param name="Json">{"Username": "staff@admin.com","Password": "admin@123"}</param>
        /// <returns>User Detail</returns>
        Task<MvResponse<MvUser>> Login(string json);
    }
}
