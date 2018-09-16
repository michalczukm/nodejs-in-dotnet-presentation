using System.Collections.Generic;
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
        [HttpPost("pdf")]
        public async Task<FileStreamResult> ConvertToPdf([FromBody] string html, [FromServices] INodeServices nodeServices)
        {
            var stream = await nodeServices.InvokeAsync<Stream>("NodeScripts/converter", html);
            return File(stream, "application/pdf");
        }

        [HttpGet("quote")]
        public async Task<dynamic> GetQuote([FromQuery] string author, [FromServices] INodeServices nodeServices)
        {
            return await nodeServices.InvokeExportAsync<dynamic>("NodeScripts/utils", "quote", author);
        }
    }
}
