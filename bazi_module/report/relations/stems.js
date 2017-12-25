'use strict';

let _ = require("lodash");
let RelationsCalculator = require('./relations-calculator');

let strengthCalculator = function () {
    let calculator = RelationsCalculator("hs");

    return {
        chartHasRelation: calculator.chartHasRelation,
        chartAndExternalPillarHaveRelation: calculator.chartAndExternalPillarHaveRelation,
        chartHasRelationsWithExternalChart: calculator.chartHasRelationsWithExternalChart,

        getMatchingRelationsInChart: calculator.getMatchingRelationsInChart
    };
};

module.exports = strengthCalculator;