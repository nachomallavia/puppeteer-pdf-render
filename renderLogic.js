const { readFile, readFileSync } = require('fs');
const path = require('path');

module.exports = async function (templateName, dataObject) {
    const Handlebars = require('handlebars');
    let templatePath = path.join(__dirname, 'templates', templateName) + '.hbs';
    const content = readFileSync(templatePath, { encodig: 'utf8' });
    Handlebars.registerHelper('sumarSaldos', (saldos) => {
        let total = 0;
        if (saldos != undefined && saldos[0] != undefined) {
            total =
                saldos[0].SaldoCSTitular +
                saldos[0].SaldoCSAdherente +
                saldos[0].SaldoServicios +
                saldos[0].SaldoCreditos;
            if (saldos[0].ImporteSinAplicar) {
                total -= saldos[0].ImporteSinAplicar;
            }
        }
        return total;
    });
    Handlebars.registerHelper('renderMin', function (variableOne, variableTwo) {
        if (variableOne < variableTwo) {
            return variableOne;
        } else {
            return variableTwo;
        }
    });
    Handlebars.registerHelper('formatDate', (timestamp) => {
        if (timestamp == '' || timestamp == null) {
            return '';
        }
        let date = new Date(timestamp);
        let simplified = new Intl.DateTimeFormat('es-AR').format(date);
        return simplified;
    });
    Handlebars.registerHelper('groupBy', function (arr, selectedKey, options) {
        let sortStore = [];
        let filteredCategories = [];
        if (arr != undefined) {
            for (let i = 0; i < arr.length; i++) {
                let currentCategory = arr[i][selectedKey];
                let lastCategory = '';
                if (i != 0) {
                    lastCategory = arr[i - 1][selectedKey];
                }
                if (
                    currentCategory != lastCategory &&
                    filteredCategories.indexOf(currentCategory) === -1
                ) {
                    filteredCategories.push(currentCategory);
                    let filteredArray = arr.filter((element) => {
                        return element[selectedKey] == currentCategory;
                    });
                    sortStore.push(filteredArray);
                }
            }
        }
        sortStore.forEach((category) => {
            let sortedCategory = category.sort((a, b) => {
                return new Date(b.FechaVto) - new Date(a.FechaVto);
            });
            return sortedCategory;
        });

        return sortStore;
    });
    Handlebars.registerHelper('ifEquals', function (a, b, options) {
        if (a === b) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    });
    Handlebars.registerHelper(
        'compare',
        function (variableOne, comparator, variableTwo) {
            if (eval(variableOne + comparator + variableTwo)) {
                return true;
            } else {
                return false;
            }
        }
    );
    Handlebars.registerHelper('minus', function (value) {
        let newValue = value * -1;
        return newValue;
    });
    Handlebars.registerHelper('today', function () {
        let today = Date.now();
        let simplified = new Intl.DateTimeFormat('es-AR').format(today);
        return simplified;
    });
    const template = Handlebars.compile(`${content}`);
    const html = template(dataObject);
    return html;
};
