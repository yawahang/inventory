
using inventory.model;
using System.Threading.Tasks;

namespace inventory.service.Product
{
    public interface IProductService
    {
        /// <summary>
        /// Get Product
        /// </summary>
        /// <returns>List of MvProduct</returns>
        Task<MvResponse<MvProduct>> Product(string json);
        /// <summary>
        /// Insert Product
        /// </summary>
        /// <returns>List of Product Detail</returns>
        Task<MvResponse<MvProduct>> Insert(string json);
        /// <summary>
        /// Update Product
        /// </summary>
        /// <returns>List of Product Detail</returns>
        Task<MvResponse<MvProduct>> Update(string json);
    }
}
