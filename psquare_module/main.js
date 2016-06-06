'use strict';

//var User = require('../models/user');

var Utils = require('./utils');
var Digits = require('./digits');
var Retriever = require('./data-retriever');


var pSquare = function (person, response) {
    if (person === null || person === undefined) {
        return;
    }

    var date = person.date;
    var digitsSquare = [];
    var op = [
        {position: 1, number: -1},
        {position: 2, number: -1},
        {position: 3, number: -1},
        {position: 4, number: -1}
    ];

    var utils = Utils(date);
    var digits = Digits();
    var retriever = Retriever(utils, digits, response);
    var len = digits.length;

    function computeSquareDigits() {
        digits.clear();
        utils.extractDigitsFromBirthDay(date, op, digits);
        utils.extractDigitsFromOP(op, digits);

        digitsSquare = [];
        for (var i = 0; i < len; i += 1) {
            digitsSquare.push(digits.getLongText(i));
        }
    }

    function aggregate(userLevel) {
        computeSquareDigits();

        var resultData = {
            dateStr: '' + date.day + date.month + date.year,
            op: op,
            digits: digits,
            digitWeights: digits.getDigits(),
            square: digitsSquare
        };

        retriever.getAllInto(resultData, op, userLevel);
    }

    return {
        make: aggregate
    };
};

module.exports = pSquare;