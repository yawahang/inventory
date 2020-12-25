using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace inventory.api.Controllers
{
    [Produces("application/json")]
    [EnableCors("AllowOrigin"), Route("api/[controller]/[action]")]
    [ApiController]
    public class BaseController : ControllerBase
    {

    }
}
