'use strict';

//var User = require('../models/user');

var Utils = require('./utils');
var Digits = require('./digits');
var Retriever = require('./data-retriever');

var pSquare = function (person, response) {
    if(person === null || person === undefined) {
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
    var retriever = Retriever(utils, response);
    var digits = Digits();
    var len = digits.length;

    function computeSquareDigits() {
        var i, c;
        var sNumber = "" + date.day + date.month + date.year;
        var sLen;
        var firstN = sNumber.charAt(0);

        digits.clear();

        // Calculate op1 and store digits in birth date
        op[0].number = 0;
        for (i = 0, sLen = sNumber.length; i < sLen; i += 1) {
            c = parseInt(sNumber.charAt(i));
            op[0].number += c;
            digits.increment(c);
        }

        // Calculate op 2, 3, 4
        op[1].number = utils.sumDigits(op[0].number);
        op[2].number = op[0].number - firstN * 2;
        op[3].number = utils.sumDigits(op[2].number);

        sNumber = "" + op[0].number + op[1].number + op[2].number + op[3].number;

        // Store digits in OPs
        for (i = 0, sLen = sNumber.length; i < sLen; i += 1) {
            c = sNumber.charAt(i);

            digits.increment(c);
        }

        digitsSquare = [];
        for (i = 0; i < len; i += 1) {
            digitsSquare.push(digits.getLongText(i));
        }
    }

    function aggregate() {
        computeSquareDigits();

        var resultData = {
            dateStr: '' + date.day + date.month + date.year,
            op: op,
            digits: digits,
            square: digitsSquare
        };

        retriever.getAllInto(resultData, op);
    }

    aggregate();
};

module.exports = pSquare;