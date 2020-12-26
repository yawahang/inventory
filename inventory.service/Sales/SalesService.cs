using Dapper;
using inventory.service.Data;
using System.Data;
using System.Threading.Tasks;

namespace inventory.service.Sales
{
    public class SalesService : ISalesService
    {
        private readonly IDataService _ds;
        public SalesService(IDataService ds)
        {
            _ds = ds;
        }

        public async Task Sales<T>(string json)
        {
            var dbparams = new DynamicParameters();
            dbparams.Add("Json", json, DbType.String);
            await _ds.Get<T>("dbo.SpSalesSel", dbparams, commandType: CommandType.StoredProcedure);
        }

        public async Task Insert<T>(string json)
        {
            var dbparams = new DynamicParameters();
            dbparams.Add("Json", json, DbType.String);
            await _ds.Insert<T>("dbo.SpSalesIns", dbparams, commandType: CommandType.StoredProcedure);
        }

        public async Task Update<T>(string json)
        {
            var dbparams = new DynamicParameters();
            dbparams.Add("Json", json, DbType.String);
            await _ds.Update<T>("dbo.SpSalesUpd", dbparams, commandType: CommandType.StoredProcedure);
        }
    }
}

