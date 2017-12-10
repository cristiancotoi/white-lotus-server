'use strict';

let _ = require("lodash");

let Phases = require('../../../models/bazi/phase');
let HS = require('../../../models/bazi/heavenly-stem');
let EB = require('../../../models/bazi/earthly-branch');

let coreElements = function () {
    function arrToMap(arr, keyName) {
        let result = {};
        _.each(arr, function (element) {
            result[element[keyName]] = element.toObject();
        });
        return result;
    }

    function getPhases(resultData) {
        let promise = Phases.find().exec();

        return promise.then(function (phases) {
            resultData.phases = arrToMap(phases, "presc");
        });
    }

    function getHS(resultData) {
        let promise = HS.find().exec();

        return promise.then(function (heavenlyStems) {
            resultData.heavenlyStems = arrToMap(heavenlyStems, "presc");
        });
    }

    function getEB(resultData) {
        let promise = EB.find().exec();

        return promise.then(function (earthlyBranches) {
            resultData.earthlyBranches = arrToMap(earthlyBranches, "presc");
        });
    }

    function aggregate(resultData, rules) {
        let promises = [];

        if (rules.includes('core elements')) {
            promises.push(getPhases(resultData));
            promises.push(getHS(resultData));
            promises.push(getEB(resultData));
        }

        return Promise.all(promises);
    }

    return {
        getAll: aggregate
    };
};

module.exports = coreElements;