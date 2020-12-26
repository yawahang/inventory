
using System.Threading.Tasks;

namespace inventory.service.Product
{
    public interface IProductService
    {
        Task Product<T>(string json);
        Task Insert<T>(string json);
        Task Update<T>(string json);
    }
}
