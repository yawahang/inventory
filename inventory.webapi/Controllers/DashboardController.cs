using inventory.service.Dashboard;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace inventory.webapi.Controllers
{
    public class DashboardController : BaseController
    {
        private readonly IDashboardService _ps;
        public DashboardController(IDashboardService ps)
        {
            _ps = ps;
        }

        [HttpGet]
        public async Task<IActionResult> Dashboard(string json)
        {
            try
            {
                var response = await _ps.Dashboard(json);
                if (response.Type == "Error")
                {
                    return Ok(response.Text);
                }
                else
                {
                    return Ok(response.Data[0]);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
