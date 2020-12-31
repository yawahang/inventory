using inventory.model;
using System.Threading.Tasks;

namespace inventory.service.Report
{
    public interface IReportService
    {
        /// <summary>
        /// Get Report
        /// </summary>
        /// <returns>Report Object</returns>
        Task<MvResponse<dynamic>> Report(string json);
    }
}
