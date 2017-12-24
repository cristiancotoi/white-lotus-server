'use strict';

let _ = require("lodash");
let RelationsCalculator = require('./relations-calculator');

let strengthCalculator = function () {
    let calculator = RelationsCalculator("hs");

    return {
        chartHasStemRelation: calculator.chartHasStemRelation,
        chartAndExternalPillarHasStemRelation: calculator.chartAndExternalPillarHasStemRelation,
        chartHasRelationsWithExternalChart: calculator.chartHasRelationsWithExternalChart
    };
};

module.exports = strengthCalculator;