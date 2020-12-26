using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace inventory.webapi.Controllers
{
    [Produces("application/json")]
    [EnableCors("AllowOrigin"), Route("api/[controller]/[action]/{id?}")]
    [ApiController]
    public class BaseController : ControllerBase
    {

    }
}
