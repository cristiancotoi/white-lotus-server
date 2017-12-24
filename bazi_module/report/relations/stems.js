'use strict';

let _ = require("lodash");
let RelationsCalculator = require('./relations-calculator');

let strengthCalculator = function () {
    let calculator = RelationsCalculator("hs");

    /**
     * Identify matching relations in a chart
     * @returns {Array}
     */
    function getMatchingRelationsInChart(chart, relationsArray) {
        let matchingRelationsArr = [];

        _.each(relationsArray, function (relation) {
            let rel1;
            if (_.isUndefined(relation.hs2)) {
                // Single branch description
                // ignored
            } else if (_.isUndefined(relation.hs3)) {
                // Relation between 2 branches
                rel1 = calculator.chartHasStemRelation(
                    chart,
                    [relation.hs1, relation.hs2]);
                if(_.size(rel1) > 0) {
                    matchingRelationsArr = _.concat(
                        matchingRelationsArr,
                        {
                            relation: relation,
                            matchingPillars: rel1
                        });
                }
            } else {
                // Relation between 3 branches
                rel1 = calculator.chartHasStemRelation(
                    chart,
                    [relation.hs1, relation.hs2, relation.hs3]);
                if(_.size(rel1) > 0) {
                    matchingRelationsArr = _.concat(
                        matchingRelationsArr,
                        {
                            relation: relation,
                            matchingPillars: rel1
                        });
                }

            }
        });
        return matchingRelationsArr;
    }


    return {
        chartHasStemRelation: calculator.chartHasStemRelation,
        chartAndExternalPillarHasStemRelation: calculator.chartAndExternalPillarHasStemRelation,
        chartHasRelationsWithExternalChart: calculator.chartHasRelationsWithExternalChart,

        getMatchingRelationsInChart: getMatchingRelationsInChart
    };
};

module.exports = strengthCalculator;