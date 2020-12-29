
using Dapper;
using inventory.model;
using inventory.service.Data;
using System.Data;
using System.Threading.Tasks;
using System;
using Newtonsoft.Json;
using System.Collections.Generic;

namespace inventory.service.Account
{
    public class AccountService : IAccountService
    {
        private readonly IDataService _ds;
        public AccountService(IDataService ds)
        {
            _ds = ds;
        }

        public async Task<MvResponse<List<MvUser>>> Login(MvLoginParam json)
        {
            try
            {
                var param = new DynamicParameters();
                param.Add("Json", JsonConvert.SerializeObject(json), DbType.String);
                var result = await _ds.Get<string>("dbo.SpUserSel", param);
                return JsonConvert.DeserializeObject<MvResponse<List<MvUser>>>(result);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
