
using inventory.model;
using System.Threading.Tasks;

namespace inventory.service.Sales
{
    public interface ISalesService
    {
        Task<MvResponse<MvSales>> Sales(string json);
        Task<MvResponse<MvSales>> Insert(string json);
        Task<MvResponse<MvSales>> Update(string json);
    }
}
