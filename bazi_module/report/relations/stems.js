'use strict';

let _ = require("lodash");
let RelationsCalculator = require('../../../../bazi_module/report/relations/relations-calculator');

let strengthCalculator = function () {
    let calculator = RelationsCalculator("hs");

    return {
        chartHasStemRelation: calculator.chartHasStemRelation,
        chartAndExternalPillarHasStemRelation: calculator.chartAndExternalPillarHasStemRelation,
        chartHasRelationsWithExternalChart: calculator.chartHasRelationsWithExternalChart
    };
};

module.exports = strengthCalculator;