module.exports = {
    ifEquals: function (a, b, options) {
        if (a === b) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    },
    groupBy: function (arr, selectedKey, options) {
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

        return sortStore;
    },
    formatDate: function (timestamp) {
        let date = new Date(timestamp);
        let simplified = new Intl.DateTimeFormat('es-AR').format(date);
        return simplified;
    },
};
