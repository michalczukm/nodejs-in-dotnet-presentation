const puppeteer = require('puppeteer');

const defaultOptions = {
    format: 'A4'
};

const convertHTMLToPDF = async (html, options = {}) => {
    if (typeof html !== 'string') {
        throw new Error(
            'Invalid Argument: HTML expected as type of string and received a value of a different type. Check your request body and request headers.'
        );
    }
    
    const browser = await puppeteer.launch();
    const page = await browser.newPage();   

    await page.setRequestInterception(true);

    page.once('request', request => {
        request.respond({
            body: html
        });

        request.continue();
    });

    await page.goto('https://example.com');

    try {
        return await page.pdf({...defaultOptions, options});
    } catch (error) {
        console.log(error);
        throw new Error('PDF generation failed!');
    } finally {
        await browser.close();
    }
};

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    if (req.body && typeof req.body === 'string') {
        const stream = await convertHTMLToPDF(req.body);

        context.res = {
            status: 200,
            body: stream,
            headers: {
                'Content-type': 'application/pdf',
                'Content-length': stream.length
            }
        };
    }
    else {
        context.res = {
            status: 400,
            body: "Please pass HTML in the request body"
        };
    }
};