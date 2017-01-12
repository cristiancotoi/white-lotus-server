'use strict';

var DateUtils = require('./date-utils');
var BaZiCalculator = require('./bazi-calculator');
var Retriever = require('./data-retriever');
var Rules = require('./rules');
var _ = require("underscore");

var baziModule = function (person, response) {
    if (person === null || person === undefined) {
        throw 'Invalid person';
    }

    var utils = DateUtils(person.date);
    var retriever = Retriever(response);

    function calculate(options) {
        var rules = Rules(options);

        var chartData = BaZiCalculator(person).compute();
        chartData.chart.year.name = 'year';
        chartData.chart.month.name = 'month';
        chartData.chart.day.name = 'day';
        chartData.chart.hour.name = 'hour';

        var resultData = {
            name: person.name,
            surname: person.surname,
            age: utils.getAge(),
            age_string: utils.include(),
            sex: person.gender,

            chart: chartData
        };
        if (rules.includes('current luck pillar')) {
            resultData.currentLuckPillar =
                utils.getCurrentLuckPillar(chartData.startYear)
        }

        // Append data about phases, hs, eb to the result.
        // All these are appended based on the fact
        // that eventually all appear in chart/analysis
        retriever.getAll(resultData, rules);
    }

    return {
        make: calculate
    }
};

module.exports = baziModule;