
using Dapper;
using inventory.data;
using inventory.model;
using System.Data;
using System.Threading.Tasks;

namespace inventory.service.Account
{
    public class AccountService : IAccountService
    {
        private readonly IDapper _dapper;
        public AccountService(IDapper dapper)
        {
            _dapper = dapper;
        }

        public async Task<MvResponse<MvUser>> Login(string json)
        {
            var dbparams = new DynamicParameters();
            dbparams.Add("Json", json, DbType.String);
            var result = await Task.FromResult(_dapper.Get<MvResponse<MvUser>>("dbo.SpUserSel",
                                                              dbparams,
                                                              commandType: CommandType.StoredProcedure));
            return result;
        }

    }
}
