const puppeteer = require('puppeteer');
require('dotenv').config();
const path = require('path');
const fs = require('fs');

const pdfLogic = async (req, res) => {
    const browser = await puppeteer.launch({
        args: [
            '--disable-setuid-sandbox',
            '--no-sandbox',
            '--single-process',
            '--no-zygote',
        ],
        executablePath:
            process.env.NODE_ENV === 'production'
                ? process.env.PUPPETEER_EXECUTABLE_PATH
                : puppeteer.executablePath(),
    });
    try {
        console.log('trying');
        const page = await browser.newPage();
        const htmlContent = fs.readFileSync(
            path.join(__dirname, 'template.html'),
            'utf8'
        );

        // Navigate the page to a URL.
        await page.setContent('<html><body><h1>TEST</h1></body></html>', {
            waitUntil: 'networkidle0',
        });
        await page.setViewport({ width: 1440, height: 1880 });
        const data = await page.title();
        const file = await page.pdf({
            format: 'A4',
            printBackground: true,
        });
        res.set('Content-Type', 'application/pdf');
        res.send(file);
    } catch (e) {
        console.error(e);
        res.send(`Something went wrong while running Puppeteer: ${e}`);
    } finally {
        await browser.close();
    }
};

module.exports = { pdfLogic };
