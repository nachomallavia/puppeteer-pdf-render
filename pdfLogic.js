const puppeteer = require('puppeteer');
require('dotenv').config();
const path = require('path');
const fs = require('fs');

const pdfLogic = async (req) => {
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
