
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
        /// <param name="Json">{}</param>
        /// <returns>List of MvProduct</returns>
        Task<MvResponse<List<MvProduct>>> Product(string json);
        /// <summary>
        /// Insert Product
        /// </summary>
        /// <param name="Json">{"ProductId":0,"Product":"Laptop","Description":"Laptop","Location":"Laptop","Stock":12,"StatusListItemId":1,"Price":10000,"Company":"Dell"}</param>
        /// <returns>Product Detail</returns>
        Task<MvResponse<MvProduct>> Insert(string json);
        /// <summary>
        /// Update Product
        /// </summary>
        /// <param name="Json">{"ProductId":0,"Product":"Laptop","Description":"Laptop","Location":"Laptop","Stock":12,"StatusListItemId":1,"Price":10000,"Company":"Dell"}</param>
        /// <returns>Product Detail</returns>
        Task<MvResponse<MvProduct>> Update(string json);
    }
}
