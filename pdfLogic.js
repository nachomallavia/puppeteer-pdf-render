const puppeteer = require('puppeteer');

require('dotenv').config();

const pdfLogic = async (req) => {
    const browser = await puppeteer.launch({
        args: [
            '--disable-setuid-sandbox',
            '--no-sandbox',
            '--single-process',
            '--no-zygote',
        ],
        executablePath:
            process.env.NODE_ENV === 'production' &&
            process.env.NODE_SERVER === 'render'
                ? process.env.PUPPETEER_EXECUTABLE_PATH
                : process.env.PUPPETEER_ALT_PATH,
    });
    try {
        console.log('trying to make a PDF');
        const page = await browser.newPage();

        // await page.setContent('<html><body><h1>HOLA</h1></body></html>');
        const htmlContent = req.body.html;
        await page.setContent(htmlContent, {
            waitUntil: 'networkidle0',
        });
        await page.setViewport({ width: 1440, height: 1880 });
        await page.emulateMediaType('screen');

        const file = await page.pdf({
            format: 'A4',
            printBackground: true,
            margin: {
                top: 10,
            },
        });

        await browser.close();
        return file;
        // res.send('ok');
    } catch (e) {
        console.error(e);
    } finally {
        await browser.close();
    }
};

module.exports = { pdfLogic };
