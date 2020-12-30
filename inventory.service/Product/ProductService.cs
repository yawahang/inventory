using inventory.model;
using inventory.service.Data;
using Newtonsoft.Json;
using System;
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

        public async Task<MvResponse<MvProduct>> Product(string json)
        {
            try
            {
                var result = await _ds.Get("dbo.SpProductSel", json);
                return JsonConvert.DeserializeObject<MvResponse<MvProduct>>(result);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<MvResponse<MvProduct>> Insert(string json)
        {
            try
            {
                var result = await _ds.Insert("dbo.SpProductIns", json);
                return JsonConvert.DeserializeObject<MvResponse<MvProduct>>(result);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<MvResponse<MvProduct>> Update(string json)
        {
            try
            {
                var result = await _ds.Update("dbo.SpProductUpd", json);
                return JsonConvert.DeserializeObject<MvResponse<MvProduct>>(result);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
