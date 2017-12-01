'use strict';

let _ = require("lodash");

let ShenShaDescription = require('../../../models/bazi/shensha-description');
let ShenShaSeason = require('../../../models/bazi/shensha-season');
let ShenShaDayBranch = require('../../../models/bazi/shensha-day-branch');
let ShenShaDayMaster = require('../../../models/bazi/shensha-day-master');
let ShenShaHeavenlyDoctor = require('../../../models/bazi/shensha-heavenly-doctor');
let ShenShaExternalPeachBlossom = require('../../../models/bazi/shensha-ext-peach-blossom');
let ShenSha3Marvels = require('../../../models/bazi/shensha-3-marvels');

let binomial = function () {
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

    function aggregate(resultData, rules) {
        let promises = [];

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

        return Promise.all(promises);
    }

    return {
        getAll: aggregate
    };
};

module.exports = binomial;