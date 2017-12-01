'use strict';

let _ = require("lodash");

let ChartUtils = require('../../algorithm/chart-utils');

let Phases = require('../../../models/bazi/phase');
let HS = require('../../../models/bazi/heavenly-stem');
let EB = require('../../../models/bazi/earthly-branch');
let Binomial = require('../../../models/bazi/binomial');

let DM = require('../../../models/bazi/day-master');
let NormalLifeType = require('../../../models/bazi/normal-life-type');
let GodsStrength = require('../../../models/bazi/gods-strength');

let StarBinomial = require('../../../models/bazi/star-binomial');
let ShenShaDescription = require('../../../models/bazi/shensha-description');
let ShenShaSeason = require('../../../models/bazi/shensha-season');
let ShenShaDayBranch = require('../../../models/bazi/shensha-day-branch');
let ShenShaDayMaster = require('../../../models/bazi/shensha-day-master');
let ShenShaHeavenlyDoctor = require('../../../models/bazi/shensha-heavenly-doctor');
let ShenShaExternalPeachBlossom = require('../../../models/bazi/shensha-ext-peach-blossom');
let ShenSha3Marvels = require('../../../models/bazi/shensha-3-marvels');

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

    function getBinomial(resultChart, position, pillar) {
        let promise = Binomial.find({hs: pillar.hs, eb: pillar.eb}).exec();

        return promise.then(function (binomial) {
            resultChart[position] = binomial[0].toObject()
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

    function getShenShaDescription(resultData) {
        let promise = ShenShaDescription.find().exec();

        return promise.then(function (allDescriptionsShenSha) {
            resultData.shenShaDesc = {};
            _.each(allDescriptionsShenSha, function (star) {
                resultData.shenShaDesc[star.id] = star.toObject();
            });
        });
    }

    function getShenShaSeason(resultData) {
        let seasonName = resultData.chart.chart.month.eb;
        let promise = ShenShaSeason.find({id: seasonName}).exec();

        return promise.then(function (allSeasonShenSha) {
            resultData.shenSha.season = allSeasonShenSha[0].toObject();
        });
    }

    function getShenShaDayBranch(resultData) {
        let dayBranch = resultData.chart.chart.day.eb;
        let promise = ShenShaDayBranch.find({id: dayBranch}).exec();

        return promise.then(function (allDayBranchShenSha) {
            resultData.shenSha.dayBranch = allDayBranchShenSha[0].toObject();
        });
    }

    function getShenShaDayMaster(resultData) {
        let dayMaster = resultData.chart.chart.day.hs;
        let promise = ShenShaDayMaster.find({id: dayMaster}).exec();

        return promise.then(function (allDayMasterShenSha) {
            resultData.shenSha.dayMaster = allDayMasterShenSha[0].toObject();
        });
    }

    function getShenShaHeavenlyDoctor(resultData) {
        let seasonName = resultData.chart.chart.month.eb;
        let promise = ShenShaHeavenlyDoctor.find({id: seasonName}).exec();

        return promise.then(function (heavenlyDoctor) {
            resultData.shenSha.heavenlyDoctor = heavenlyDoctor[0].toObject();
        });
    }

    function getShenShaExternalPeachBlossom(resultData) {
        let seasonName = resultData.chart.chart.month.eb;
        let promise = ShenShaExternalPeachBlossom.find({id: seasonName}).exec();

        return promise.then(function (externalPeachBlossom) {
            resultData.shenSha.extPeachBlossom = externalPeachBlossom[0].toObject();
        });
    }

    function getShenSha3Marvels(resultData) {
        let dayMaster = resultData.chart.chart.day.hs;
        let promise = ShenSha3Marvels.find({id: dayMaster}).exec();

        return promise.then(function (the3marvel) {
            if (the3marvel.length &&
                resultData.chart.chart.month.hs === the3marvel[0].month &&
                resultData.chart.chart.year.hs === the3marvel[0].year) {
                resultData.shenSha.the3marvel = the3marvel[0].toObject();
            }
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
        let chart = resultData.chart.chart;
        resultData.detailedChart = {};

        promises.push(getPhases(resultData));
        promises.push(getHS(resultData));
        promises.push(getEB(resultData));

        promises.push(getBinomial(
            resultData.detailedChart, 'year',
            chart.year));
        promises.push(getBinomial(
            resultData.detailedChart, 'month',
            chart.month));
        promises.push(getBinomial(
            resultData.detailedChart, 'day',
            chart.day));
        if (!_.isUndefined(chart.hour.hs)) {
            promises.push(getBinomial(
                resultData.detailedChart, 'hour',
                chart.hour));
        }

        if (rules.includes('dm')) {
            promises.push(getDM(resultData));
        }

        if (rules.includes('gods strength for season')) {
            promises.push(getGodsStrengthsForSeason(resultData));
        }
        if (rules.includes('normal life type')) {
            promises.push(getNormalLifeType(resultData));
        }

        // Shen Sha
        if (rules.includes('shen sha')) {

            resultData.shenSha = {};
            promises.push(getShenShaDescription(resultData));

            promises.push(getShenShaSeason(resultData));
            promises.push(getShenShaDayBranch(resultData));
            promises.push(getShenShaDayMaster(resultData));
            promises.push(getShenShaExternalPeachBlossom(resultData));
            promises.push(getShenShaHeavenlyDoctor(resultData));
            promises.push(getShenSha3Marvels(resultData));
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