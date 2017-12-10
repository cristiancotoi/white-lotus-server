'use strict';

let _ = require("lodash");

let strengthCalculator = function () {

    function appendIfPillarHasBranch(chart, pillarName, branchName, resultArray) {
        if (chart[pillarName].eb === branchName) {
            resultArray.push([{pillar: pillarName, branch: branchName}]);
        }
    }

    /**
     * Check if a branch appears in a chart.
     * Returns an array of arrays to match the output of the other matching functions.
     * @returns {*[]}
     */
    function chartHasSingleBranch(chart, branchName) {
        let resultArray = [];
        appendIfPillarHasBranch(chart, 'hour', branchName, resultArray);
        appendIfPillarHasBranch(chart, 'day', branchName, resultArray);
        appendIfPillarHasBranch(chart, 'month', branchName, resultArray);
        appendIfPillarHasBranch(chart, 'year', branchName, resultArray);
        return resultArray;
    }

    function appendIf2PillarsHaveBranches(chart, pillarNames, branchName, resultArray) {
        if ((chart[pillarNames[1]].eb === branchName[1] && chart[pillarNames[0]].eb === branchName[0]) ||
            (chart[pillarNames[0]].eb === branchName[1] && chart[pillarNames[1]].eb === branchName[0])) {
            resultArray.push([{
                pillar: pillarNames[1],
                branch: chart[pillarNames[1]].eb === branchName[1] ? branchName[1] : branchName[0]
            }, {
                pillar: pillarNames[0],
                branch: chart[pillarNames[0]].eb === branchName[1] ? branchName[1] : branchName[0]
            }]);
        }
    }

    function chartHas2AdjacentBranches(chart, branchName1, branchName2) {
        let resultArray = [];
        appendIf2PillarsHaveBranches(chart, ['hour', 'day'], [branchName1, branchName2], resultArray);
        appendIf2PillarsHaveBranches(chart, ['month', 'day'], [branchName1, branchName2], resultArray);
        appendIf2PillarsHaveBranches(chart, ['month', 'year'], [branchName1, branchName2], resultArray);
        return resultArray;
    }

    /**
     * Brute force check to see if 3 branches are adjacent and form a relation.
     */
    function appendIf3PillarsHaveBranches(chart, pillarNames, branchName, resultArray) {
        if (
            (
            chart[pillarNames[0]].eb === branchName[0] &&
            chart[pillarNames[1]].eb === branchName[1] &&
            chart[pillarNames[2]].eb === branchName[2]) ||
            (
            chart[pillarNames[0]].eb === branchName[0] &&
            chart[pillarNames[1]].eb === branchName[2] &&
            chart[pillarNames[2]].eb === branchName[1]) ||

            (
            chart[pillarNames[0]].eb === branchName[1] &&
            chart[pillarNames[1]].eb === branchName[0] &&
            chart[pillarNames[2]].eb === branchName[2]) ||
            (
            chart[pillarNames[0]].eb === branchName[1] &&
            chart[pillarNames[1]].eb === branchName[2] &&
            chart[pillarNames[2]].eb === branchName[0]) ||

            (
            chart[pillarNames[0]].eb === branchName[2] &&
            chart[pillarNames[1]].eb === branchName[0] &&
            chart[pillarNames[2]].eb === branchName[1]) ||
            (
            chart[pillarNames[0]].eb === branchName[2] &&
            chart[pillarNames[1]].eb === branchName[1] &&
            chart[pillarNames[2]].eb === branchName[0])
        ) {
            resultArray.push([
                {
                    pillar: pillarNames[0],
                    branch: chart[pillarNames[0]].eb === branchName[0] ?
                        branchName[0] :
                        chart[pillarNames[0]].eb === branchName[1] ?
                            branchName[1] :
                            branchName[2]
                },
                {
                    pillar: pillarNames[1],
                    branch: chart[pillarNames[1]].eb === branchName[0] ?
                        branchName[0] :
                        chart[pillarNames[1]].eb === branchName[1] ?
                            branchName[1] :
                            branchName[2]
                },
                {
                    pillar: pillarNames[2],
                    branch: chart[pillarNames[2]].eb === branchName[0] ?
                        branchName[0] :
                        chart[pillarNames[2]].eb === branchName[1] ?
                            branchName[1] :
                            branchName[2]
                }
            ]);
        }
    }

    /**
     * Check that 3 branches can be adjacent in a chart.
     * Does a brute force check of all the variants.
     * @returns {Array}
     */
    function chartHas3AdjacentBranches(chart, branchName1, branchName2, branchName3) {
        let resultArray = [];
        appendIf3PillarsHaveBranches(chart, ['hour', 'day', 'month'],
            [branchName1, branchName2, branchName3], resultArray
        );
        appendIf3PillarsHaveBranches(chart, ['year', 'day', 'month'],
            [branchName1, branchName2, branchName3], resultArray
        );
        return resultArray;
    }

    /**
     * Utility function that appends the relation only if it's present.
     */
    function appendRelationIfPresent(matchingPillars, matchingRelationsArr, relation) {
        if (matchingPillars.length) {
            if (!_.isUndefined(relation.toObject)) {
                relation = relation.toObject();
            }
            let output = {
                relation: relation,
                matchingPillars: matchingPillars
            };
            matchingRelationsArr.push(output);
        }
    }

    /**
     * Identify matching relations in a chart
     * @returns {Array}
     */
    function getMatchingRelationsInChart(chart, relationsArray) {
        let matchingRelationsArr = [];

        _.each(relationsArray, function (relation) {
            if (_.isUndefined(relation.eb2)) {
                // Single branch description
                appendRelationIfPresent(
                    chartHasSingleBranch(chart, relation.eb1),
                    matchingRelationsArr, relation);
            } else if (_.isUndefined(relation.eb3)) {
                // Relation between 2 branches
                appendRelationIfPresent(
                    chartHas2AdjacentBranches(chart, relation.eb1, relation.eb2),
                    matchingRelationsArr, relation);
            } else {
                // Relation between 3 branches
                appendRelationIfPresent(
                    chartHas3AdjacentBranches(chart, relation.eb1, relation.eb2, relation.eb3),
                    matchingRelationsArr, relation);
            }
        });
        return matchingRelationsArr;
    }

    return {
        getMatchingRelationsInChart: getMatchingRelationsInChart,

        chartHasBranch: chartHasSingleBranch,
        chartHas2AdjacentBranches: chartHas2AdjacentBranches,
        chartHas3AdjacentBranches: chartHas3AdjacentBranches
    };
};

module.exports = strengthCalculator;