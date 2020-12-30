
using inventory.model;
using inventory.service.Product;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;

namespace inventory.webapi.Controllers
{
    public class ProductController : BaseController
    {
        private readonly IProductService _ps;
        public ProductController(IProductService ps)
        {
            _ps = ps;
        }

        [HttpGet]
        public async Task<IActionResult> Product(string json)
        {
            try
            {
                var response = await _ps.Product(json);
                if (response.Type == "Error")
                {
                    return Ok(response.Text);
                }
                else
                {
                    return Ok(response.Data);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPost]
        public async Task<IActionResult> Insert([FromBody][Required] MvPost json)
        {
            try
            {
                var response = await _ps.Insert(JsonConvert.SerializeObject(json.Json));
                if (response.Type == "Error")
                {
                    return Ok(response.Text);
                }
                else
                {
                    return Ok(response.Data);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPost]
        public async Task<IActionResult> Update([FromBody][Required] MvPost json)
        {
            try
            {
                var response = await _ps.Update(JsonConvert.SerializeObject(json.Json));
                if (response.Type == "Error")
                {
                    return Ok(response.Text);
                }
                else
                {
                    return Ok(response.Data);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
