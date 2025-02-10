module.exports = {
    ifEquals: function (a, b, options) {
        if (a === b) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    },
    multiply: function (a, b) {
        return a * b;
    },
    // groupBy: function (arr, firstKey, secondKey = null) {
    //     //====== LATEST VERSION =======
    //     // let sortStore = [];

    //     // let firstGroup = Object.groupBy(arr, ({ firstKey }) => firstKey);

    //     // for (category in firstGroup) {
    //     //     // sortStore.push(firstGroup[category]);
    //     //     let subGroup = Object.groupBy(
    //     //         firstGroup[category],
    //     //         ({ secondKey }) => secondKey
    //     //     );
    //     //     for (miniGroup in subGroup) {
    //     //         sortStore.push(subGroup[miniGroup]);
    //     //     }
    //     // }
    //     // sortStore.forEach((category) => {
    //     //     let sortedCategory = category.sort((a, b) => {
    //     //         return new Date(b.FechaVto) - new Date(a.FechaVto);
    //     //     });
    //     //     return sortedCategory;
    //     // });
    //     // return sortStore;

    //     //====== LATEST VERSION =======
    //     let sortStore = [];
    //     for (let i = 0; i < arr.length; i++) {
    //         let lastFirstCategory = '';
    //         let currentFirstCategory = arr[i][firstKey];
    //         let lastSecondCategory = '';
    //         let currentSecondCategory = arr[i][secondKey];
    //         let combinedKeyCategories = [];

    //         if (i != 0) {
    //             lastFirstCategory = arr[i - 1][firstKey];
    //             lastSecondCategory = arr[i - 1][secondKey];
    //         }
    //         arr = arr.sort((elementA, elementB) => {
    //             if (elementA[firstKey] > elementB[firstKey]) {
    //                 return 1;
    //             }
    //             if (elementA[firstKey] < elementB[firstKey]) {
    //                 return -1;
    //             }
    //             return 0;
    //         });
    //         arr = arr.sort((elementA, elementB) => {
    //             if (elementA[secondKey] > elementB[secondKey]) {
    //                 return 1;
    //             }
    //             if (elementA[secondKey] < elementB[secondKey]) {
    //                 return -1;
    //             }
    //             return 0;
    //         });
    //         if (
    //             currentFirstCategory != lastFirstCategory &&
    //             (currentSecondCategory != lastSecondCategory ||
    //                 currentSecondCategory == '')
    //         ) {
    //             if (
    //                 combinedKeyCategories.indexOf(
    //                     currentFirstCategory + currentSecondCategory
    //                 )
    //             ) {
    //                 combinedKeyCategories.push(
    //                     currentFirstCategory + currentSecondCategory
    //                 );
    //                 groupArray = arr.filter((element) => {
    //                     if (
    //                         element[firstKey] == currentFirstCategory &&
    //                         element[secondKey] == currentSecondCategory
    //                     ) {
    //                         return true;
    //                     }
    //                 });
    //                 sortStore.push(groupArray);
    //             }
    //         }
    //     }
    //     sortStore.forEach((category) => {
    //         let sortedCategory = category.sort((a, b) => {
    //             return new Date(b.FechaVto) - new Date(a.FechaVto);
    //         });
    //         return sortedCategory;
    //     });
    //     return sortStore;
    // },
    // groupBy: function (arr, firstKey, secondKey = null) {
    //     let sortStore = [];
    //     let filteredCategories = [];
    //     if (arr != undefined) {
    //         let secondKeyGroup = false;
    //         let filteredArray;
    //         for (let i = 0; i < arr.length; i++) {
    //             secondKeyGroup = false;
    //             let currentCategory = arr[i][firstKey];
    //             let lastCategory = '';
    //             if (i != 0) {
    //                 lastCategory = arr[i - 1][firstKey];
    //             }
    //             if (
    //                 currentCategory != lastCategory &&
    //                 filteredCategories.indexOf(currentCategory) === -1
    //             ) {
    //                 filteredCategories.push(currentCategory);
    //                 filteredArray = arr.filter((element) => {
    //                     return element[firstKey] == currentCategory;
    //                 });
    //             }
    //             if (secondKey != null) {
    //                 for (let i = 0; i < filteredArray.length; i++) {
    //                     let secondaryFilterList = [];
    //                     let currentSecondary = filteredArray[i][secondKey];
    //                     let lastSecondary = '';
    //                     if (i != 0) {
    //                         lastSecondary = filteredArray[i - 1][secondKey];
    //                     }

    //                     if (
    //                         currentSecondary != '' &&
    //                         currentSecondary != ' ' &&
    //                         currentSecondary != lastSecondary &&
    //                         secondaryFilterList.indexOf(currentSecondary) === -1
    //                     ) {
    //                         secondaryFilterList.push(currentSecondary);
    //                         let secondFilter = filteredArray.filter(
    //                             (element) => {
    //                                 return (
    //                                     element[secondKey] == currentSecondary
    //                                 );
    //                             }
    //                         );
    //                         sortStore.push(secondFilter);
    //                         secondKeyGroup = true;
    //                     }
    //                 }
    //             }

    //             if (secondKeyGroup == true) {
    //                 continue;
    //             } else {
    //                 sortStore.push(filteredArray);
    //             }
    //         }
    //     }
    //     sortStore.forEach((category) => {
    //         let sortedCategory = category.sort((a, b) => {
    //             return new Date(b.FechaVto) - new Date(a.FechaVto);
    //         });
    //         return sortedCategory;
    //     });

    //     return sortStore;
    // },
    groupBy: function (arr, selectedKey, secondKey) {
        let sortStore = [];
        let filteredCategories = [];
        for (let i = 0; i < arr.length; i++) {
            let currentCategory = arr[i][selectedKey];
            let currentSecondary = arr[i][secondKey];
            let lastCategory = '';
            let lastSecondary = '';
            if (i != 0) {
                lastCategory = arr[i - 1][selectedKey];
                lastSecondary = arr[i - 1][secondKey];
            }
            if (
                currentCategory + currentSecondary !=
                    lastCategory + lastSecondary &&
                filteredCategories.indexOf(
                    currentCategory + currentSecondary
                ) === -1
            ) {
                filteredCategories.push(currentCategory + currentSecondary);
                let filteredArray = arr.filter((element) => {
                    return (
                        element[selectedKey] == currentCategory &&
                        element[secondKey] == currentSecondary
                    );
                });
                sortStore.push(filteredArray);
            }
        }
        sortStore.forEach((category) => {
            let sortedCategory = category.sort((a, b) => {
                return new Date(b.FechaVto) - new Date(a.FechaVto);
            });
            return sortedCategory;
        });

        return sortStore;
    },
    formatDate: function (timestamp) {
        if (timestamp == '' || timestamp == null) {
            return '';
        }
        let date = new Date(timestamp);
        let simplified = new Intl.DateTimeFormat('es-AR').format(date);
        return simplified;
    },
    compare: function (variableOne, comparator, variableTwo) {
        if (eval(variableOne + comparator + variableTwo)) {
            return true;
        } else {
            return false;
        }
    },
    minus: function (value) {
        let newValue = value * -1;
        return newValue;
    },
    today: function () {
        let today = Date.now();
        let simplified = new Intl.DateTimeFormat('es-AR').format(today);
        return simplified;
    },
    sumarSaldos: function (saldos) {
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
        if (total > 0) {
            return total;
        } else {
            return 0;
        }
    },
    format: function (number) {
        let rounder = new Intl.NumberFormat('es-AR', {
            style: 'decimal',
            maximumFractionDigits: 0,
            minimumFractionDigits: 0,
        });
        let formatter = new Intl.NumberFormat('es-AR', {
            style: 'decimal',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
        let numString;
        if (number % 1 == 0) {
            numString = rounder.format(number);
        } else {
            numString = formatter.format(number);
        }
        let formated = numString.split(' ').join('');
        return formated;
    },
    renderMin: function (variableOne, variableTwo) {
        if (variableOne < variableTwo) {
            return variableOne;
        } else {
            return variableTwo;
        }
    },
};
