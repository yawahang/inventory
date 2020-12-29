using Dapper;
using inventory.model;
using inventory.service.Data;
using Newtonsoft.Json;
using System.Collections.Generic;
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

        public async Task<MvResponse<List<MvProduct>>> Product(MvGetOptions json)
        {
            var param = new DynamicParameters();
            param.Add("Json", JsonConvert.SerializeObject(json), DbType.String);
            var result = await _ds.Get<string>("dbo.SpProductSel", param);
            return JsonConvert.DeserializeObject<MvResponse<List<MvProduct>>>(result);
        }

        public async Task<MvResponse<MvProduct>> Insert(MvPostOptions<MvProduct> json)
        {
            var param = new DynamicParameters();
            param.Add("Json", json, DbType.String);
            var result = await _ds.Get<string>("dbo.SpProductIns", param);
            return JsonConvert.DeserializeObject<MvResponse<MvProduct>>(result);
        }

        public async Task<MvResponse<MvProduct>> Update(MvPostOptions<MvProduct> json)
        {
            var param = new DynamicParameters();
            param.Add("Json", json, DbType.String);
            var result = await _ds.Get<string>("dbo.SpProductUpd", param);
            return JsonConvert.DeserializeObject<MvResponse<MvProduct>>(result);
        }
    }
}
