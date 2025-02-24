const express = require('express');
require('dotenv').config();
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
const token = process.env.API_TOKEN;

const PORT = process.env.PORT || 4000;

function filterDates(userData) {
    let servicesArr = userData.serviciosRepositorio;
    if (servicesArr != undefined) {
        let data = servicesArr.filter((service) => {
            console.log(userData);
            let string = service.FechaVto;
            let dateToCheck = new Date(string);
            // console.log('Date to check is:', dateToCheck);
            let today = new Date();

            // console.log('Today is:', today);

            let check =
                dateToCheck < today ||
                dateToCheck.getUTCMonth() == today.getUTCMonth();
            // console.log(check);
            return check;
        });
        userData.serviciosRepositorio = data;
    }
    return userData;
}
function calcularMora(userData) {
    let creditosAdministradosMora = userData.creditosAdministrados;
    creditosAdministradosMora.forEach((credito) => {
        if (credito.Estado == 'Mora') {
            credito.Mora = credito.ValorCuota * credito.Cuotas_Impagas;
        }
    });
    userData.creditosAdministrados = creditosAdministradosMora;
    return userData;
}
app.engine('.hbs', hbs.engine);
app.engine('.html', hbs.engine);

app.use(express.json());

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'templates'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/i', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});
app.get('/estado', (req, res) => {
    res.sendFile(path.join(__dirname, 'estado.html'));
});
app.get('/final', (req, res) => {
    res.sendFile(path.join(__dirname, 'estado-de-cuenta.html'));
});
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'estado-de-cuenta.html'));
});
app.get('/:id', async (req, res) => {
    const id = req.params.id;
    const data = await fetch(
        `https://sistema.mundoamtae.com/alianzas/Api/SalesForce/GetReporteEstadoCuenta/${token}/${id}`
    );

    if (data.status == 200) {
        const content = await data.json();
        console.log(content);
        let newData = filterDates(content);
        // newData = calcularMora(newData);
        res.render('estado-de-cuenta', newData);
    } else if (data.status == 400) {
        console.log(data);
    }
});
app.get('/:id/pdf/', async (req, res) => {
    const id = req.params.id;
    const data = await fetch(
        `https://sistema.mundoamtae.com/alianzas/Api/SalesForce/GetReporteEstadoCuenta/${token}/${id}`
    );

    if (data.status == 200) {
        const templateName = 'estado-de-cuenta';
        const content = await data.json();
        let newData = filterDates(content);
        // newData = calcularMora(newData);
        const html = await renderLogic(templateName, newData);
        req.body.html = html;
        const pdf = await pdfLogic(req);
        res.set('content-type', 'application/pdf');
        res.send(pdf);
    } else if (data.status == 400) {
        console.log(data);
    }
});
app.get('/:id/ampliar', async (req, res) => {
    const id = req.params.id;
    const data = await fetch(
        `https://sistema.mundoamtae.com/alianzas/Api/SalesForce/GetReporteEstadoCuenta/${token}/${id}`
    );

    if (data.status == 200) {
        const content = await data.json();
        let newData = filterDates(content);
        // newData = calcularMora(newData);
        res.render('estado-de-cuenta-ampliado', newData);
    } else if (data.status == 400) {
        console.log(data);
    }
});
app.get('/:id/ampliar/pdf/', async (req, res) => {
    const id = req.params.id;
    const data = await fetch(
        `https://sistema.mundoamtae.com/alianzas/Api/SalesForce/GetReporteEstadoCuenta/${token}/${id}`
    );

    if (data.status == 200) {
        const templateName = 'estado-de-cuenta-ampliado';
        const content = await data.json();
        let newData = filterDates(content);
        // newData = calcularMora(newData);
        const html = await renderLogic(templateName, newData);
        req.body.html = html;
        const pdf = await pdfLogic(req);
        res.set('content-type', 'application/pdf');
        res.send(pdf);
    } else if (data.status == 400) {
        console.log(data);
    }
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
