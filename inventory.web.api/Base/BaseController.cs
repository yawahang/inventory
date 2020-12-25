﻿using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace inventory.api.Base
{
    [Produces("application/json")]
    [EnableCors("AllowOrigin"), Route("api/[controller]/[action]")]
    [ApiController]
    public class BaseController : ControllerBase
    {

    }
}
