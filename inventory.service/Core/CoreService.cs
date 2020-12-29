
using Dapper;
using inventory.model;
using inventory.service.Data;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace inventory.service.Core
{
    public class CoreService : ICoreService
    {
        private readonly IDataService _ds;
        public CoreService(IDataService ds)
        {
            _ds = ds;
        }

        public async Task<MvResponse<List<MvListItem>>> ListItem(MvGetOptions json)
        {
            try
            {
                var param = new DynamicParameters();
                param.Add("Json", JsonConvert.SerializeObject(json), DbType.String);
                var result = await _ds.Get<string>("dbo.SpListItemSel", param);
                return JsonConvert.DeserializeObject<MvResponse<List<MvListItem>>>(result);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
