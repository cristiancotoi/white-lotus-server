'use strict';

var _ = require("underscore");
var Phases = require('../models/bazi/phase');
var HS = require('../models/bazi/heavenly-stem');
var EB = require('../models/bazi/earthly-branch');
var Binomial = require('../models/bazi/binomial');

var DM = require('../models/bazi/day-master');
var GodsStrength = require('../models/bazi/gods-strength');

var GodsCalculator = require('../bazi_module/gods-calculator');

var binomial = function (response) {
    function arrToMap(arr, keyName) {
        var result = {};
        _.each(arr, function (element) {
            result[element[keyName]] = element;
        });
        return result;
    }

    function getPhases(resultData) {
        var promise = Phases.find().exec();

        return promise.then(function (phases) {
            resultData.phases = arrToMap(phases, "presc");
        });
    }

    function getHS(resultData) {
        var promise = HS.find().exec();

        return promise.then(function (heavenlyStems) {
            resultData.heavenlyStems = arrToMap(heavenlyStems, "presc");
        });
    }

    function getEB(resultData) {
        var promise = EB.find().exec();

        return promise.then(function (earthlyBranches) {
            resultData.earthlyBranches = arrToMap(earthlyBranches, "presc");
        });
    }

    function getBinomial(resultChart, position, pillar) {
        var promise = Binomial.find({hs: pillar.hs, eb: pillar.eb}).exec();

        return promise.then(function (binomial) {
            resultChart[position] = binomial[0].toObject();
        });
    }

    function getDM(resultData) {
        var dmName = resultData.chart.chart.day.hs;
        var promise = DM.find({id: dmName}).exec();

        return promise.then(function (dm) {
            resultData.dm = dm[0].toObject();
        });
    }

    function getGodsStrengthsForSeason(resultData) {
        var seasonName = resultData.chart.chart.month.eb;
        var promise = GodsStrength.find({id: seasonName}).exec();

        return promise.then(function (strength) {
            resultData.godsStrength = strength[0].toObject();
        });
    }

    function postProcessing(resultData) {
        var calculator = GodsCalculator();
        var stems = resultData.heavenlyStems;
        var godsScore = calculator.getStemsStrength(
            resultData.detailedChart,
            stems,
            resultData.earthlyBranches);
        var scoreForSeason = resultData.godsStrength;
        _.each(godsScore, function (score) {
            var scoreMultiplier = scoreForSeason[score.phase.toLowerCase()];
            score.visible *= scoreMultiplier;
            score.mainHidden *= scoreMultiplier;
            score.prison *= scoreMultiplier;
            score.grave *= scoreMultiplier;
            score.total *= scoreMultiplier;
        });
        resultData.godsScore = godsScore;

        // Lighten up the load we send to the client
        delete resultData.godsStrength;
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
        if (!_.isUndefined(chart.hour.hs)) {
            promises.push(getBinomial(
                resultData.detailedChart, 'hour',
                chart.hour));
        }
        for (var i = 0; i < luckLen; i++) {
            promises.push(getBinomial(
                resultData.detailedLuck, i,
                luck[i]));
        }

        promises.push(getDM(resultData));
        promises.push(getGodsStrengthsForSeason(resultData));

        Promise.all(promises).then(function () {
            postProcessing(resultData);

            // All DB queries are finished - returning the result
            response.json(resultData);

        }, function (err) {
            console.log(err);
        });
        return resultData;
    }

    return {
        getAllInto: aggregate
    };
};

module.exports = binomial;