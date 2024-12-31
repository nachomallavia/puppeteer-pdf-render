const express = require('express');
const path = require('path');
const { pdfLogic } = require('./pdfLogic');
const app = express();

const PORT = process.env.PORT || 4000;

app.get('/pdf', (req, res) => {
    pdfLogic(req, res);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'template.html'));
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
