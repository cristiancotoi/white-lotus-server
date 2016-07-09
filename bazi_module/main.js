'use strict';

var DateUtils = require('./date-utils');
var BaZiCalculator = require('./bazi-calculator');
var Retriever = require('./data-retriever');
var _ = require("underscore");

var baziModule = function (person, response) {
    if (person === null || person === undefined) {
        return;
    }

    var utils = DateUtils(person.date);
    var retriever = Retriever(response);

    function calculate(userLevel) {
        var chartData = BaZiCalculator(person).compute();
        chartData.chart.year.name = 'year';
        chartData.chart.month.name = 'month';
        chartData.chart.day.name = 'day';
        chartData.chart.hour.name = 'hour';

        var resultData = {
            name: person.name,
            surname: person.surname,
            age: utils.getAge(),
            analysis: {},
            age_string: utils.getAgeString(),
            sex: person.sex,

            chart: chartData,
            currentLuckPillar: utils.getCurrentLuckPillar(chartData.startYear),
            dm: {}
        };

        // Append data about phases, hs, eb to the result.
        // All these are appended based on the fact
        // that eventually all appear in chart/analysis
        retriever.getAllInto(resultData, userLevel);
    }

    return {
        make: calculate
    }
};

module.exports = baziModule;