
using inventory.model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace inventory.service.Product
{
    public interface IProductService
    {
        Task<MvResponse<List<MvProduct>>> Product(string json);
        Task<MvResponse<MvProduct>> Insert(string json);
        Task<MvResponse<MvProduct>> Update(string json);
    }
}
