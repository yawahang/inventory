using System.Threading.Tasks;

namespace inventory.service.Account
{
    public interface IAccountService
    {
        Task Login<T>(string login);
    }
}
