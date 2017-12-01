'use strict';

//let User = require('../models/user');

let Utils = require('./utils');
let Digits = require('./digits');
let Retriever = require('./data-retriever');


let pSquare = function (person, response) {
    if (person === null || person === undefined) {
        throw 'Invalid person';
    }

    let date = person.date;
    let digitsSquare = [];
    let op = [
        {position: 1, number: -1},
        {position: 2, number: -1},
        {position: 3, number: -1},
        {position: 4, number: -1}
    ];

    let utils = Utils(date, person.tz);
    let digits = Digits();
    let retriever = Retriever(utils, digits, response);

    function computeSquareDigits() {
        digits.clear();
        utils.extractDigitsFromBirthDay(date, op, digits);
        utils.extractDigitsFromOP(op, digits);
        digitsSquare = digits.getAllDigitsLongNames();
    }

    function aggregate(userLevel) {
        computeSquareDigits();

        let luckChartDigits = utils.getLuckChartDigits();
        let resultData = {
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

        retriever.getAll(resultData, op, userLevel);
    }

    return {
        make: aggregate
    };
};

module.exports = pSquare;