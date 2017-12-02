'use strict';

let _ = require("lodash");

let Binomial = require('../../../models/bazi/binomial');

let chartRetriever = function () {

    function getBinomial(resultChart, position, pillar) {
        let promise = Binomial.find({hs: pillar.hs, eb: pillar.eb}).exec();

        return promise.then(function (binomial) {
            resultChart[position] = binomial[0].toObject()
        });
    }

    function aggregate(resultData) {
        let promises = [];
        let chart = resultData.chart.chart;
        resultData.detailedChart = {};

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

        return Promise.all(promises);
    }

    return {
        getAll: aggregate
    };
};

module.exports = chartRetriever;