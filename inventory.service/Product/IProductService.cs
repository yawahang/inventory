
using inventory.model;
using System.Threading.Tasks;

namespace inventory.service.Product
{
    public interface IProductService
    {
        Task<MvResponse<MvProduct>> Product(string json);
        Task<MvResponse<MvProduct>> Insert(string json);
        Task<MvResponse<MvProduct>> Update(string json);
    }
}
