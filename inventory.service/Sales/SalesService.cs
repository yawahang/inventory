using Dapper;
using inventory.data;
using inventory.model;
using System.Data;
using System.Threading.Tasks;

namespace inventory.service.Sales
{
    class SalesService : ISalesService
    {
        private readonly IDapper _dapper;
        public SalesService(IDapper dapper)
        {
            _dapper = dapper;
        }

        public async Task<MvResponse<MvSales>> Sales(string json)
        {
            var dbparams = new DynamicParameters();
            dbparams.Add("Json", json, DbType.String);
            var result = await Task.FromResult(_dapper.Get<MvResponse<MvSales>>("dbo.SpSalesSel",
                                                              dbparams,
                                                              commandType: CommandType.StoredProcedure));
            return result;
        }

        public async Task<MvResponse<MvSales>> Insert(string json)
        {
            var dbparams = new DynamicParameters();
            dbparams.Add("Json", json, DbType.String);
            var result = await Task.FromResult(_dapper.Insert<MvResponse<MvSales>>("dbo.SpSalesIns",
                                                              dbparams,
                                                              commandType: CommandType.StoredProcedure));
            return result;
        }

        public async Task<MvResponse<MvSales>> Update(string json)
        {
            var dbparams = new DynamicParameters();
            dbparams.Add("Json", json, DbType.String);
            var result = await Task.FromResult(_dapper.Update<MvResponse<MvSales>>("dbo.SpSalesUpd",
                                                              dbparams,
                                                              commandType: CommandType.StoredProcedure));
            return result;
        }
    }
}

