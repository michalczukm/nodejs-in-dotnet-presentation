using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PuppeteerSharp;

namespace AspNetNodeJsExample.Controllers
{
    [Route("puppeter")]
    [ApiController]
    public class PuppeteerSharpController : ControllerBase
    {
        [HttpPost("pdf")]
        public async Task<FileStreamResult> ConvertToPdf(
            [FromBody] string html)
        {
            await new BrowserFetcher().DownloadAsync(BrowserFetcher.DefaultRevision);
            var browser = await Puppeteer.LaunchAsync(new LaunchOptions
            {
                Headless = true
            });
            
            using(var page = await browser.NewPageAsync())
            {
                await page.SetContentAsync(html);
                return File(await page.PdfStreamAsync(), "application/pdf");
            }
        }
    }
}