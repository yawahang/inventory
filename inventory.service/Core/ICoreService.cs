using inventory.model;
using System.Threading.Tasks;

namespace inventory.service.Core
{
    public interface ICoreService
    {
        /// <summary>
        /// Get ListItem
        /// </summary>
        /// <param name="Json">{"Category": "ProductStatus"}</param>
        /// <returns>List of ListItems</returns>
        Task<MvResponse<MvListItem>> ListItem(string json);
    }
}
