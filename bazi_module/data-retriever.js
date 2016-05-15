'use strict';

var _ = require("underscore");
var Phases = require('../models/bazi/phase');
var HS = require('../models/bazi/heavenly-stem');
var EB = require('../models/bazi/earthly-branch');
var Binomial = require('../models/bazi/binomial');

var binomial = function (response) {
    function getPhases(resultData) {
        var promise = Phases.find().exec();

        return promise.then(function (phases) {
            resultData.phases = phases;
        });
    }

    function getHS(resultData) {
        var promise = HS.find().exec();

        return promise.then(function (heavenlyStems) {
            resultData.heavenlyStems = heavenlyStems;
        });
    }

    function getEB(resultData) {
        var promise = EB.find().exec();

        return promise.then(function (earthlyBranches) {
            resultData.earthlyBranches = earthlyBranches;
        });
    }

    function getBinomial(resultChart, position, pillar) {
        var promise = Binomial.find({hs: pillar.hs, eb: pillar.eb}).exec();

        return promise.then(function (binomial) {
            resultChart[position] = binomial[0];
        });
    }

    function aggregate(resultData) {
        var promises = [];
        var chart = resultData.chart.chart;
        var luck = resultData.chart.luck;
        resultData.detailedChart = {};
        resultData.detailedLuck = [];
        var luckLen = luck.length;

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
        promises.push(getBinomial(
            resultData.detailedChart, 'hour',
            chart.hour));
        for (var i = 0; i < luckLen; i++) {
            promises.push(getBinomial(
                resultData.detailedLuck, i,
                luck[i]));
        }

        Promise.all(promises).then(function () {
            // All DB queries are finished - returning the result
            response.json(resultData);
        });
        return resultData;
    }

    return {
        getAllInto: aggregate
    };
};

module.exports = binomial;