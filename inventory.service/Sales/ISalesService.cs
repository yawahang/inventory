
using System.Threading.Tasks;

namespace inventory.service.Sales
{
    public interface ISalesService
    {
        Task Sales<T>(string json);
        Task Insert<T>(string json);
        Task Update<T>(string json);
    }
}
