
using inventory.model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace inventory.service.Product
{
    public interface IProductService
    {
        /// <summary>
        /// Get Product
        /// </summary>
        /// <returns>List of MvProduct</returns>
        Task<MvResponse<List<MvProduct>>> Product(MvGetOptions json);
        /// <summary>
        /// Insert Product
        /// </summary>
        /// <returns>List of Product Detail</returns>
        Task<MvResponse<MvProduct>> Insert(MvPostOptions<MvProduct> json);
        /// <summary>
        /// Update Product
        /// </summary>
        /// <returns>List of Product Detail</returns>
        Task<MvResponse<MvProduct>> Update(MvPostOptions<MvProduct> json);
    }
}
