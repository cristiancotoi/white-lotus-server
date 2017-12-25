'use strict';

let _ = require("lodash");
/**
 *
 * @param searchFor "eb" or "hs"
 */
let strengthCalculator = function (searchFor) {
    let searchForBranchOrStem =
        _.isUndefined(searchFor) || (searchFor !== "eb" && searchFor !== "hs") ?
        "eb" :
        searchFor;

    function pillarsObjectToArray(pillars) {
        if (_.isArray(pillars)) return pillars;

        let pillarsArray = [];
        _.forOwn(_.cloneDeep(pillars), function (pillar, pillarName) {
            pillar.name = pillarName;
            pillarsArray.push(pillar);
        });
        return pillarsArray;
    }

    function eq(pillar, item) {
        let hsFound = false, ebFound = false;
        if (searchForBranchOrStem === 'hs') {
            hsFound = pillar.hs === item;
        } else if (searchForBranchOrStem === 'eb') {
            ebFound = pillar.eb === item;
        } else {
            hsFound = pillar.hs === item;
            ebFound = pillar.eb === item;
        }
        return hsFound || ebFound;
    }

    function makePillarResult(pillar) {
        let result = {
            pillar: pillar.name
        };
        if (searchForBranchOrStem === 'mix' || searchForBranchOrStem === 'hs') {
            result["stem"] = pillar.hs;
        }
        if (searchForBranchOrStem === 'mix' || searchForBranchOrStem === 'eb') {
            result["branch"] = pillar.eb;
        }
        return result;
    }

    function pillarsHave2ItemsInRelation(pillars, itemsList) {
        let result = [];
        let pillarsArray = pillarsObjectToArray(pillars);
        if (
            (eq(pillarsArray[0], itemsList[0]) && eq(pillarsArray[1], itemsList[1])) ||
            (eq(pillarsArray[0], itemsList[1]) && eq(pillarsArray[1], itemsList[0]))
        ) {
            result.push([
                makePillarResult(pillarsArray[0]),
                makePillarResult(pillarsArray[1])
            ]);
        }
        return result;
    }

    function pillarsHave3ItemsInRelation(pillars, itemsList) {
        let result = [];
        let pillarsArray = pillarsObjectToArray(pillars);
        if (
            (
                eq(pillarsArray[0], itemsList[0]) &&
                eq(pillarsArray[1], itemsList[1]) &&
                eq(pillarsArray[2], itemsList[2])
            ) || (
                eq(pillarsArray[0], itemsList[0]) &&
                eq(pillarsArray[2], itemsList[1]) &&
                eq(pillarsArray[1], itemsList[2])
            ) || (
                eq(pillarsArray[1], itemsList[0]) &&
                eq(pillarsArray[0], itemsList[1]) &&
                eq(pillarsArray[2], itemsList[2])
            ) || (
                eq(pillarsArray[1], itemsList[0]) &&
                eq(pillarsArray[2], itemsList[1]) &&
                eq(pillarsArray[0], itemsList[2])
            ) || (
                eq(pillarsArray[2], itemsList[0]) &&
                eq(pillarsArray[0], itemsList[1]) &&
                eq(pillarsArray[1], itemsList[2])
            ) || (
                eq(pillarsArray[2], itemsList[0]) &&
                eq(pillarsArray[1], itemsList[1]) &&
                eq(pillarsArray[0], itemsList[2])
            )
        ) {
            let group = [makePillarResult(pillarsArray[0])];
            if (!_.isUndefined(itemsList[1])) {
                group.push(makePillarResult(pillarsArray[1]))
            }
            if (!_.isUndefined(itemsList[2])) {
                group.push(makePillarResult(pillarsArray[2]))
            }
            result.push(group);
        }
        return result;
    }

    function pillarsHaveRelation(pillars, itemsList) {
        let pillarsSize = _.size(pillars);
        let relationSize = _.size(itemsList);
        console.assert(pillarsSize === relationSize,
            'Pillars set should have the same number of elements as the relation. ' +
            'pillars [' + pillarsSize + '], relation [' + relationSize + ']');
        console.assert(pillarsSize > 1 && pillarsSize < 4,
            'Function can only handle 2 or 3 elements in a relation. relation [' + relationSize + ']');
        return relationSize === 2 ?
            pillarsHave2ItemsInRelation(pillars, itemsList) :
            pillarsHave3ItemsInRelation(pillars, itemsList);
    }

    function chartHasRelation(chart, itemsList) {
        let relationSize = _.size(itemsList);
        let chartArray = pillarsObjectToArray(chart);
        let chartSize = _.size(chartArray);
        if (relationSize === 3) chartSize--;

        let result = [];
        for (let i = 0; i < chartSize - 1; i++) {
            // Pick 2 consecutive pillars in chart
            let chartSubArray = [chartArray[i], chartArray[i + 1]];
            if (relationSize === 3) chartSubArray.push(chartArray[i + 2]);

            let chartSubArrayRelation = pillarsHaveRelation(chartSubArray, itemsList);
            if (_.size(chartSubArrayRelation) > 0) {
                result = _.concat(result, chartSubArrayRelation);
            }
        }
        return result;
    }

    function chartAndExternalPillarHasRelation(chart, pillar, itemsList) {
        let relationSize = _.size(itemsList);
        let chartArray = pillarsObjectToArray(chart);
        let chartSize = _.size(chartArray);
        if (relationSize === 3) chartSize--;

        let result = [];
        for (let i = 0; i < chartSize; i++) {
            // Pick 2 consecutive pillars in chart
            let chartSubArray = [pillar, chartArray[i]];
            if (relationSize === 3) chartSubArray.push(chartArray[i + 1]);

            let chartSubArrayRelation = pillarsHaveRelation(chartSubArray, itemsList);
            if (_.size(chartSubArrayRelation) > 0) {
                result = _.concat(result, chartSubArrayRelation);
            }
        }
        return result;
    }

    function chartHasRelationsWithExternalChart(chart, externalChart, itemsList) {
        let extChartArray = pillarsObjectToArray(externalChart);
        let result = [];
        _.each(extChartArray, function (pillar) {
            pillar.name = "external-" + pillar.name;
            let chartAndPillarRelation =
                chartAndExternalPillarHasRelation(chart, pillar, itemsList);
            if (_.size(chartAndPillarRelation) > 0) {
                result = _.concat(result, chartAndPillarRelation);
            }
        });
        return result;
    }

    /**
     * Identify matching relations in a chart
     * @returns {Array}
     */
    function getMatchingRelationsInChart(chart, relationsArray) {
        let matchingRelationsArr = [];

        _.each(relationsArray, function (relation) {
            let rel1;
            if (_.isUndefined(relation[searchForBranchOrStem + "2"])) {
                // Single branch description
                // ignored
            } else if (_.isUndefined(relation[searchForBranchOrStem + "3"])) {
                // Relation between 2 branches
                rel1 = chartHasRelation(
                    chart,
                    [relation[searchForBranchOrStem + "1"], relation[searchForBranchOrStem + "2"]]);
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
                rel1 = chartHasRelation(
                    chart,
                    [relation[searchForBranchOrStem + "1"], relation[searchForBranchOrStem + "2"], relation[searchForBranchOrStem + "3"]]);
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
        pillarsHave2ItemsInRelation: pillarsHave2ItemsInRelation,
        pillarsHave3ItemsInRelation: pillarsHave3ItemsInRelation,
        pillarsHaveRelation: pillarsHaveRelation,
        chartHasRelation: chartHasRelation,
        chartAndExternalPillarHaveRelation: chartAndExternalPillarHasRelation,
        chartHasRelationsWithExternalChart: chartHasRelationsWithExternalChart,

        getMatchingRelationsInChart: getMatchingRelationsInChart
    };
};

module.exports = strengthCalculator;