
using inventory.model;
using inventory.service.Data;
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

        public async Task<MvResponse<MvUser>> Login(string json)
        {
            try
            {
                string result = await _ds.Get("dbo.SpUserSel", json);
                return JsonConvert.DeserializeObject<MvResponse<MvUser>>(result);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
