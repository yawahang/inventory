
using Dapper;
using inventory.service.Data;
using System.Data;
using System.Threading.Tasks;

namespace inventory.service.Account
{
    public class AccountService : IAccountService
    {
        private readonly IDataService _ds;
        public AccountService(IDataService ds)
        {
            _ds = ds;
        }

        public async Task Login<T>(string json)
        {
            var dbparams = new DynamicParameters();
            dbparams.Add("Json", json, DbType.String);
            await _ds.Get<T>("dbo.SpUserSel", dbparams, commandType: CommandType.StoredProcedure);
        }

    }
}
