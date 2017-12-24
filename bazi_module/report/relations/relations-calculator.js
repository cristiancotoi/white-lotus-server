'use strict';

let _ = require("lodash");

let strengthCalculator = function (searchFor) {
    let searchForBranchOrStem = _.isUndefined(searchFor) ?
        "mix" :
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

    function pillarsHave2StemRelation(pillars, stemsList) {
        let result = [];
        let pillarsArray = pillarsObjectToArray(pillars);
        if (
            (eq(pillarsArray[0], stemsList[0]) && eq(pillarsArray[1], stemsList[1])) ||
            (eq(pillarsArray[0], stemsList[1]) && eq(pillarsArray[1], stemsList[0]))
        ) {
            result.push([
                makePillarResult(pillarsArray[0]),
                makePillarResult(pillarsArray[1])
            ]);
        }
        return result;
    }

    function pillarsHave3StemRelation(pillars, stemsList) {
        let result = [];
        let pillarsArray = pillarsObjectToArray(pillars);
        if (
            (
                eq(pillarsArray[0], stemsList[0]) &&
                eq(pillarsArray[1], stemsList[1]) &&
                eq(pillarsArray[2], stemsList[2])
            ) || (
                eq(pillarsArray[0], stemsList[0]) &&
                eq(pillarsArray[2], stemsList[1]) &&
                eq(pillarsArray[1], stemsList[2])
            ) || (
                eq(pillarsArray[1], stemsList[0]) &&
                eq(pillarsArray[0], stemsList[1]) &&
                eq(pillarsArray[2], stemsList[2])
            ) || (
                eq(pillarsArray[1], stemsList[0]) &&
                eq(pillarsArray[2], stemsList[1]) &&
                eq(pillarsArray[0], stemsList[2])
            ) || (
                eq(pillarsArray[2], stemsList[0]) &&
                eq(pillarsArray[0], stemsList[1]) &&
                eq(pillarsArray[1], stemsList[2])
            ) || (
                eq(pillarsArray[2], stemsList[0]) &&
                eq(pillarsArray[1], stemsList[1]) &&
                eq(pillarsArray[0], stemsList[2])
            )
        ) {
            let group = [makePillarResult(pillarsArray[0])];
            if (!_.isUndefined(stemsList[1])) {
                group.push(makePillarResult(pillarsArray[1]))
            }
            if (!_.isUndefined(stemsList[2])) {
                group.push(makePillarResult(pillarsArray[2]))
            }
            result.push(group);
        }
        return result;
    }

    function pillarsHaveStemRelation(pillars, stemsList) {
        let pillarsSize = _.size(pillars);
        let relationSize = _.size(stemsList);
        console.assert(pillarsSize === relationSize,
            'Pillars set should have the same number of elements as the relation. ' +
            'pillars [' + pillarsSize + '], relation [' + relationSize + ']');
        console.assert(pillarsSize > 1 && pillarsSize < 4,
            'Function can only handle 2 or 3 elements in a relation. relation [' + relationSize + ']');
        return relationSize === 2 ?
            pillarsHave2StemRelation(pillars, stemsList) :
            pillarsHave3StemRelation(pillars, stemsList);
    }

    function chartHasRelation(chart, stemsList) {
        let relationSize = _.size(stemsList);
        let chartArray = pillarsObjectToArray(chart);
        let chartSize = _.size(chartArray);
        if (relationSize === 3) chartSize--;

        let result = [];
        for (let i = 0; i < chartSize - 1; i++) {
            // Pick 2 consecutive pillars in chart
            let chartSubArray = [chartArray[i], chartArray[i + 1]];
            if (relationSize === 3) chartSubArray.push(chartArray[i + 2]);

            let chartSubArrayRelation = pillarsHaveStemRelation(chartSubArray, stemsList);
            if (_.size(chartSubArrayRelation) > 0) {
                result = _.concat(result, chartSubArrayRelation);
            }
        }
        return result;
    }

    function chartAndExternalPillarHasStemRelation(chart, pillar, stemsList) {
        let relationSize = _.size(stemsList);
        let chartArray = pillarsObjectToArray(chart);
        let chartSize = _.size(chartArray);
        if (relationSize === 3) chartSize--;

        let result = [];
        for (let i = 0; i < chartSize; i++) {
            // Pick 2 consecutive pillars in chart
            let chartSubArray = [pillar, chartArray[i]];
            if (relationSize === 3) chartSubArray.push(chartArray[i + 1]);

            let chartSubArrayRelation = pillarsHaveStemRelation(chartSubArray, stemsList);
            if (_.size(chartSubArrayRelation) > 0) {
                result = _.concat(result, chartSubArrayRelation);
            }
        }
        return result;
    }

    function chartHasRelationsWithExternalChart(chart, externalChart, stemsList) {
        let extChartArray = pillarsObjectToArray(externalChart);
        let result = [];
        _.each(extChartArray, function (pillar) {
            pillar.name = "external-" + pillar.name;
            let chartAndPillarRelation =
                chartAndExternalPillarHasStemRelation(chart, pillar, stemsList);
            if (_.size(chartAndPillarRelation) > 0) {
                result = _.concat(result, chartAndPillarRelation);
            }
        });
        return result;
    }

    return {
        pillarsHave2StemRelation: pillarsHave2StemRelation,
        pillarsHave3StemRelation: pillarsHave3StemRelation,
        pillarsHaveStemRelation: pillarsHaveStemRelation,
        chartHasStemRelation: chartHasRelation,
        chartAndExternalPillarHasStemRelation: chartAndExternalPillarHasStemRelation,
        chartHasRelationsWithExternalChart: chartHasRelationsWithExternalChart
    };
};

module.exports = strengthCalculator;