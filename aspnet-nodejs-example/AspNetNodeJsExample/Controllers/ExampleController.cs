using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.NodeServices;

namespace AspNetNodeJsExample.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExampleController : ControllerBase
    {
        [HttpGet]
        public ActionResult<dynamic> Get()
        {
            return new {foo = 51};
        }

        [HttpPost("pdf")]
        public async Task<FileStreamResult> GetPdf([FromBody] string html, [FromServices] INodeServices nodeServices)
        {
            var stream = await nodeServices.InvokeAsync<Stream>("NodeScripts/converter", html);
            return File(stream, "application/pdf");
        }
    }
}
