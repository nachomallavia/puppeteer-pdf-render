const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const hbs = exphbs.create({
    helpers: require('./helpers'),
    extname: '.hbs',
    defaultLayout: false,
});

const path = require('path');
const { pdfLogic } = require('./pdfLogic');
const renderLogic = require('./renderLogic');

const bodyParser = require('body-parser');

const mockData = require('./mockData.json');

const PORT = process.env.PORT || 4000;

app.engine('.hbs', hbs.engine);
app.engine('.html', hbs.engine);

app.use(express.json());

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'templates'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.post('/pdf', async (req, res) => {
    const templateName = req.body.template;
    const html = await renderLogic(templateName, mockData);

    req.body.html = html;
    const pdf = await pdfLogic(req);

    res.set('content-type', 'application/pdf');
    res.send(pdf);
});

app.get('/pdf', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});
app.get('/', (req, res) => {
    res.render('estado-de-cuenta', mockData);
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
