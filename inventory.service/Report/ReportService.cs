using inventory.model;
using inventory.service.Data;
using Newtonsoft.Json;
using System;
using System.Threading.Tasks;

namespace inventory.service.Report
{
    public class ReportService : IReportService
    {
        private readonly IDataService _ds;
        public ReportService(IDataService ds)
        {
            _ds = ds;
        }

        public async Task<MvResponse<dynamic>> Report(string json)
        {
            try
            {
                var result = await _ds.Get("dbo.SpReportSel", json);
                return JsonConvert.DeserializeObject<MvResponse<dynamic>>(result);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
