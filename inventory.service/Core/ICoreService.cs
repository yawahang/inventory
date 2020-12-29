using inventory.model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace inventory.service.Core
{
    public interface ICoreService
    {
        /// <summary>
        /// Get ListItem
        /// </summary>
        /// <returns>List of ListItems</returns>
        Task<MvResponse<List<MvListItem>>> ListItem(MvGetOptions json);
    }
}
