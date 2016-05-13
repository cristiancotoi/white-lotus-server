'use strict';

var Utils = require('./utils');
var BaZiCalculator = require('./bazi-calculator');

var baziModule = function (person, response) {
    if(person === null || person === undefined) {
        return;
    }

    var date = person.date;
    var utils = Utils(date);

    function calculate() {
        var chartData = BaZiCalculator(date).compute();
        var resultData = {
            name: person.name,
            surname: person.surname,
            //age: utils.getAge(),
            //luck_start_year: -1,
            analysis: {},
            age_string: utils.getAgeString(),
            sex: '',

            chart: chartData,
            dm: {},
            luck_pillars: {}
        };

        response.json(resultData);
    }

    calculate();
};

module.exports = baziModule;