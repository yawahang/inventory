using Dapper;
using inventory.service.Data;
using System.Data;
using System.Threading.Tasks;

namespace inventory.service.Product
{
    public class ProductService : IProductService
    {
        private readonly IDataService _ds;
        public ProductService(IDataService ds)
        {
            _ds = ds;
        }

        public async Task Product<T>(string json)
        {
            var dbparams = new DynamicParameters();
            dbparams.Add("Json", json, DbType.String);
            await _ds.Get<T>("dbo.SpProductSel", dbparams, commandType: CommandType.StoredProcedure);
        }

        public async Task Insert<T>(string json)
        {
            var dbparams = new DynamicParameters();
            dbparams.Add("Json", json, DbType.String);
            await _ds.Insert<T>("dbo.SpProductIns", dbparams, commandType: CommandType.StoredProcedure);
        }

        public async Task Update<T>(string json)
        {
            var dbparams = new DynamicParameters();
            dbparams.Add("Json", json, DbType.String);
            await _ds.Update<T>("dbo.SpProductUpd", dbparams, commandType: CommandType.StoredProcedure);
        }
    }
}
