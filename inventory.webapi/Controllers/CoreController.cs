﻿using System;
using System.Threading.Tasks;
using inventory.model;
using inventory.service.Core;
using Microsoft.AspNetCore.Mvc;

namespace inventory.webapi.Controllers
{
    public class CoreController : BaseController
    {
        private readonly ICoreService _cs;
        public CoreController(ICoreService cs)
        {
            _cs = cs;
        }

        [HttpGet]
        public async Task<IActionResult> ListItem(MvGetOptions json)
        {
            try
            {
                var response = await _cs.ListItem(json);
                if (response.Type == "Error")
                {
                    return BadRequest(response.Text);
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
