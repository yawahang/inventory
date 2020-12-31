using inventory.model;
using System.Threading.Tasks;

namespace inventory.service.Dashboard
{
    public interface IDashboardService
    {
        /// <summary>
        /// Get Dashboard
        /// </summary>
        /// <returns>Dashboard Object</returns>
        Task<MvResponse<dynamic>> Dashboard(string json);
    }
}
