'use strict';

let _ = require("lodash");

let BranchRelation = require('../../../models/bazi/branch-relation');

let GodsCalculator = require('../gods-calculator');

let relations = function () {
    let calculator = GodsCalculator();

    function getBranchRelations(resultData) {
        let promise = BranchRelation.find().exec();

        return promise.then(function (allRelations) {
            resultData.branchRelations =
                calculator.getMatchingRelations(
                    resultData.chart.chart,
                    allRelations
                );
        });
    }

    function aggregate(resultData, rules) {
        let promises = [];

        if (rules.includes('branch relations')) {
            promises.push(getBranchRelations(resultData));
        }

        return Promise.all(promises);
    }

    return {
        getAll: aggregate
    };
};

module.exports = relations;