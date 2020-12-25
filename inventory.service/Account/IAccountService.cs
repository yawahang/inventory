
using inventory.model;
using System.Threading.Tasks;

namespace inventory.service.Account
{
    public interface IAccountService
    {
        Task<MvResponse<MvUser>> Login(string login);
    }
}
