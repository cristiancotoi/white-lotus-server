'use strict';

let DateUtils = require('./date-utils');
let BaZiCalculator = require('./bazi-calculator');
let Retriever = require('./data-retriever');
let Rules = require('./rules');
let _ = require("underscore");

let baziModule = function (person, response) {
    if (person === null || person === undefined) {
        throw 'Invalid person';
    }

    let utils = DateUtils(person.date);
    let retriever = Retriever(response);

    function calculate(options) {
        let rules = Rules(options);

        let chartData = BaZiCalculator(person).compute();
        chartData.chart.year.name = 'year';
        chartData.chart.month.name = 'month';
        chartData.chart.day.name = 'day';
        chartData.chart.hour.name = 'hour';

        let resultData = {
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