'use strict';

//var User = require('../models/user');

var Utils = require('./utils');
var Digits = require('./digits');
var Retriever = require('./data-retriever');


var pSquare = function (person, response) {
    if (person === null || person === undefined) {
        throw 'Invalid person';
    }

    var date = person.date;
    var digitsSquare = [];
    var op = [
        {position: 1, number: -1},
        {position: 2, number: -1},
        {position: 3, number: -1},
        {position: 4, number: -1}
    ];

    var utils = Utils(date, person.tz);
    var digits = Digits();
    var retriever = Retriever(utils, digits, response);

    function computeSquareDigits() {
        digits.clear();
        utils.extractDigitsFromBirthDay(date, op, digits);
        utils.extractDigitsFromOP(op, digits);
        digitsSquare = digits.getAllDigitsLongNames();
    }

    function aggregate(userLevel) {
        computeSquareDigits();

        var luckChartDigits = utils.getLuckChartDigits();
        var resultData = {
            dateStr: '' + date.day + date.month + date.year,
            date: date,
            op: op,
            digits: digits,
            digitWeights: digits.getDigits(),
            square: digitsSquare,
            challenges: utils.getChallenges(),
            opportunities: utils.getOpportunities(),
            chAndOpIntervals: utils.getChallengeAndOpportunityIntervals(op[1].number),
            luckChartDigits: luckChartDigits,
            luckYears: utils.getYearsMatrix(luckChartDigits.digits.length)
        };

        retriever.getAllInto(resultData, op, userLevel);
    }

    return {
        make: aggregate
    };
};

module.exports = pSquare;