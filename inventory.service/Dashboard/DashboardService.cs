using inventory.model;
using inventory.service.Data;
using Newtonsoft.Json;
using System;
using System.Threading.Tasks;

namespace inventory.service.Dashboard
{
    public class DashboardService : IDashboardService
    {
        private readonly IDataService _ds;
        public DashboardService(IDataService ds)
        {
            _ds = ds;
        }

        public async Task<MvResponse<dynamic>> Dashboard(string json)
        {
            try
            {
                string result = await _ds.Get("dbo.SpDashboardSel", json);
                return JsonConvert.DeserializeObject<MvResponse<dynamic>>(result);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
