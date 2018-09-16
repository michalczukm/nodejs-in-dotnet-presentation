const stream = require('stream');
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

module.exports = async (result, html, options = {}) => {
    const pdfBuffer = await convertHTMLToPDF(html, options);

    const bufferStream = new stream.PassThrough();
    bufferStream.end(pdfBuffer);
    bufferStream.pipe(result.stream);
};
