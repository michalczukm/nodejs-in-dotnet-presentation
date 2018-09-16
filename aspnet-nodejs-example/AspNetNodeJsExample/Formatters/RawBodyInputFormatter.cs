using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.Formatters;

namespace AspNetNodeJsExample.Formatters
{
    public class RawBodyInputFormatter : InputFormatter
    {
        public override bool CanRead(InputFormatterContext context)
        {
            return true;
        }

        public override async Task<InputFormatterResult> ReadRequestBodyAsync(InputFormatterContext context)
        {
            var request = context.HttpContext.Request;
            using (var reader = new StreamReader(request.Body))
            {
                var content = await reader.ReadToEndAsync();
                return await InputFormatterResult.SuccessAsync(content);
            }
        }
    }
}