using Dapper;
using inventory.data;
using inventory.model;
using System.Data;
using System.Threading.Tasks;

namespace inventory.service.Product
{
    public class ProductService : IProductService
    {
        private readonly IDapper _dapper;
        public ProductService(IDapper dapper)
        {
            _dapper = dapper;
        }

        public async Task<MvResponse<MvProduct>> Product(string json)
        {
            var dbparams = new DynamicParameters();
            dbparams.Add("Json", json, DbType.String);
            var result = await Task.FromResult(_dapper.Get<MvResponse<MvProduct>>("dbo.SpProductSel",
                                                              dbparams,
                                                              commandType: CommandType.StoredProcedure));
            return result;
        }

        public async Task<MvResponse<MvProduct>> Insert(string json)
        {
            var dbparams = new DynamicParameters();
            dbparams.Add("Json", json, DbType.String);
            var result = await Task.FromResult(_dapper.Insert<MvResponse<MvProduct>>("dbo.SpProductIns",
                                                              dbparams,
                                                              commandType: CommandType.StoredProcedure));
            return result;
        }

        public async Task<MvResponse<MvProduct>> Update(string json)
        {
            var dbparams = new DynamicParameters();
            dbparams.Add("Json", json, DbType.String);
            var result = await Task.FromResult(_dapper.Update<MvResponse<MvProduct>>("dbo.SpProductUpd",
                                                              dbparams,
                                                              commandType: CommandType.StoredProcedure));
            return result;
        }
    }
}
