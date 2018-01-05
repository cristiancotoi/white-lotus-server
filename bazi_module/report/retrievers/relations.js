'use strict';

let _ = require("lodash");

let BranchRelation = require('../../../models/bazi/branch-relation');
let StemRelation = require('../../../models/bazi/stem-relation');

let BranchRelationsCalculator = require('../relations/branch');

let relations = function () {
    function getBranchRelations(resultData) {
        let promise = BranchRelation.find().exec();

        return promise.then(function (allBranchRelations) {
            resultData.branchRelations =
                BranchRelationsCalculator().getMatchingRelationsInChart(
                    resultData.chart.chart,
                    allBranchRelations
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