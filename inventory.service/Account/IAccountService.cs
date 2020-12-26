using inventory.model;
using System.Threading.Tasks;

namespace inventory.service.Account
{
    public interface IAccountService
    {
        /// <summary>
        /// User Login
        /// </summary>
        /// <param name="Json">{"Username": "staff@admin.com","Password": "admin@123"}</param>
        /// <returns>User object</returns>
        Task<MvUser> Login(string json);
    }
}
