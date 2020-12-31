using System;
using System.Threading.Tasks;
using inventory.service.Report;
using Microsoft.AspNetCore.Mvc;

namespace inventory.webapi.Controllers
{
    public class ReportController : BaseController
    {
        private readonly IReportService _ps;
        public ReportController(IReportService ps)
        {
            _ps = ps;
        }

        [HttpGet]
        public async Task<IActionResult> Report(string json)
        {
            try
            {
                var response = await _ps.Report(json);
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
