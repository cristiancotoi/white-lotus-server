'use strict';

var Utils = require('./utils');
var BaZiCalculator = require('./bazi-calculator');
var Retriever = require('./data-retriever');
var _ = require("underscore");

var baziModule = function (person, response) {
    if(person === null || person === undefined) {
        return;
    }

    var utils = Utils(person.date);
    var retriever = Retriever(response);

    function calculate() {
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
            dm: {}
        };

        // Append data about phases, hs, eb to the result.
        // All these are appended based on the fact
        // that eventually all appear in chart/analysis
        retriever.getAllInto(resultData);
    }

    calculate();
};

module.exports = baziModule;