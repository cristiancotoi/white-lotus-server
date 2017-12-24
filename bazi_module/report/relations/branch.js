'use strict';

let _ = require("lodash");
let RelationsCalculator = require('./relations-calculator');

let strengthCalculator = function () {
    let calculator = RelationsCalculator("eb");

    /**
     * Identify matching relations in a chart
     * @returns {Array}
     */
    function getMatchingRelationsInChart(chart, relationsArray) {
        let matchingRelationsArr = [];

        _.each(relationsArray, function (relation) {
            let rel1;
            if (_.isUndefined(relation.eb2)) {
                // Single branch description
                // ignored
            } else if (_.isUndefined(relation.eb3)) {
                // Relation between 2 branches
                rel1 = calculator.chartHasStemRelation(
                    chart,
                    [relation.eb1, relation.eb2]);
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
                    [relation.eb1, relation.eb2, relation.eb3]);
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
        getMatchingRelationsInChart: getMatchingRelationsInChart
    };
};

module.exports = strengthCalculator;