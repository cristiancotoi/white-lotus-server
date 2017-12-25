'use strict';

let _ = require("lodash");
let RelationsCalculator = require('./relations-calculator');

let strengthCalculator = function () {
    let calculator = RelationsCalculator("eb");

    return {
        getMatchingRelationsInChart: calculator.getMatchingRelationsInChart
    };
};

module.exports = strengthCalculator;