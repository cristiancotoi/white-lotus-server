'use strict';

let _ = require("lodash");

let ChartUtils = require('../../algorithm/chart-utils');

let Phases = require('../../../models/bazi/phase');
let HS = require('../../../models/bazi/heavenly-stem');
let EB = require('../../../models/bazi/earthly-branch');

let DM = require('../../../models/bazi/day-master');
let NormalLifeType = require('../../../models/bazi/normal-life-type');
let GodsStrength = require('../../../models/bazi/gods-strength');

let StarBinomial = require('../../../models/bazi/star-binomial');

let binomial = function () {
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

    function getDM(resultData) {
        let dmName = resultData.chart.chart.day.hs;
        let promise = DM.find({id: dmName}).exec();

        return promise.then(function (dm) {
            resultData.dm = dm[0].toObject();
        });
    }

    function getNormalLifeType(resultData) {
        let dmName = resultData.chart.chart.day.hs;
        let normalLifeTypeStem = ChartUtils().getNormalLifeTypeStem(resultData.chart.chart);
        let gods = ChartUtils().getGods(dmName);
        let normalLifeType = gods[normalLifeTypeStem];
        let promise = NormalLifeType.find({shortname: normalLifeType}).exec();

        return promise.then(function (nlt) {
            resultData.normalLifeType = nlt[0].toObject();
        });
    }

    function getGodsStrengthsForSeason(resultData) {
        let seasonName = resultData.chart.chart.month.eb;
        let promise = GodsStrength.find({id: seasonName}).exec();

        return promise.then(function (strength) {
            resultData.godsStrength = strength[0].toObject();
        });
    }

    function getStarBinomial(resultData) {
        let dayMaster = resultData.chart.chart.day.hs;
        let dayBranch = resultData.chart.chart.day.eb;
        let seasonName = resultData.chart.chart.month.eb;
        let promise = StarBinomial.find({stem: dayMaster, branch: dayBranch}).exec();
        return promise.then(function (starBinomials) {
            let result = [];
            _.each(starBinomials, function (sb) {
                if ((_.isUndefined(sb.season)) ||
                    (sb.season === seasonName)) {
                    result.push(sb.toObject());
                }
            });
            resultData.starBinomial = result;
        });
    }

    function aggregate(resultData, rules) {
        let promises = [];

        promises.push(getPhases(resultData));
        promises.push(getHS(resultData));
        promises.push(getEB(resultData));

        if (rules.includes('dm')) {
            promises.push(getDM(resultData));
        }

        if (rules.includes('gods strength for season')) {
            promises.push(getGodsStrengthsForSeason(resultData));
        }
        if (rules.includes('normal life type')) {
            promises.push(getNormalLifeType(resultData));
        }

        if (rules.includes('day star binomial')) {
            promises.push(getStarBinomial(resultData));
        }

        return Promise.all(promises);
    }

    return {
        getAll: aggregate
    };
};

module.exports = binomial;