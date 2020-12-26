
using Dapper;
using inventory.model;
using inventory.service.Data;
using System.Data;
using System.Threading.Tasks;
using System;
using Newtonsoft.Json;

namespace inventory.service.Account
{
    public class AccountService : IAccountService
    {
        private readonly IDataService _ds;
        public AccountService(IDataService ds)
        {
            _ds = ds;
        }

        public async Task<MvUser> Login(string json)
        {
            try
            {
                var param = new DynamicParameters();
                param.Add("Json", json, DbType.String);
                var result = await _ds.Get<string>("dbo.SpUserSel", param);
                return JsonConvert.DeserializeObject<MvUser>(result);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
