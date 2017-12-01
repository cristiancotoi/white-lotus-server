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

let luckRetriever = function () {
    function arrToMap(arr, keyName) {
        let result = {};
        _.each(arr, function (element) {
            result[element[keyName]] = element.toObject();
        });
        return result;
    }

    function getBinomial(resultChart, position, pillar) {
        let promise = Binomial.find({hs: pillar.hs, eb: pillar.eb}).exec();

        return promise.then(function (binomial) {
            resultChart[position] = binomial[0].toObject()
        });
    }

    function aggregate(resultData) {
        let promises = [];
        let luck = resultData.chart.luck;
        resultData.detailedLuck = [];
        let luckLen = luck.length;

        for (let i = 0; i < luckLen; i++) {
            promises.push(getBinomial(
                resultData.detailedLuck, i,
                luck[i]));
        }

        return Promise.all(promises);
    }

    return {
        getAll: aggregate
    };
};

module.exports = luckRetriever;