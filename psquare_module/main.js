'use strict';

var Promise = require("bluebird");

var Person = require('../models/person');
var OperationalNumber = require('../models/psquare/op-number');
var SpiritLevel = require('../models/psquare/spirit-level');
var Destiny = require('../models/psquare/destiny');
var InteriorVibration = require('../models/psquare/int-vibration');
var ExteriorVibration = require('../models/psquare/ext-vibration');

var pSquare = function (person, response) {
    var date = person.date;
    var numbers = {
        0: {id: 0, count: 0},
        1: {id: 1, count: 0},
        2: {id: 2, count: 0},
        3: {id: 3, count: 0},
        4: {id: 4, count: 0},
        5: {id: 5, count: 0},
        6: {id: 6, count: 0},
        7: {id: 7, count: 0},
        8: {'id': 8, count: 0},
        9: {'id': 9, count: 0}
    };
    var len = Object.keys(numbers).length;

    var digitsSquare = [];

    var op = [
        {position: 1, number: -1},
        {position: 2, number: -1},
        {position: 3, number: -1},
        {position: 4, number: -1}
    ];

    function getDaySum() {
        //Double sum to make sure we only get 1 digit
        return sumDigits(sumDigits(date.day));
    }

    function getMonthSum() {
        return sumDigits(date.month);
    }

    function getYearSum() {
        return sumDigits(sumDigits(date.year));
    }

    function getCosmicVibration() {
        return sumDigits(sumDigits(
            date.year.toString().substr(2,2)
        ));
    }

    function multiplyNumber(number, count) {
        if (count == 0) return '';
        var output = '';
        for (var i = 0; i < count; i += 1) {
            output += number;
        }
        return output;
    }

    function getLongText(digit) {
        if (typeof digit == 'object') {
            return multiplyNumber(digit.id, digit.count);
        } else {
            var o = numbers[digit];
            return multiplyNumber(o.id, o.count);
        }
    }

    function clearNumbers() {
        for (var i = 0; i < len; i += 1) {
            numbers[i].count = 0;
        }
    }

    function sumDigits(number) {
        var sNumber = "" + number;
        var output = 0;
        for (var i = 0, sLen = sNumber.length; i < sLen; i += 1) {
            output += parseInt(sNumber.charAt(i));
        }
        return output;
    }

    function computeSquareNumbers() {
        var i, c;
        var sNumber = "" + date.day + date.month + date.year;
        var sLen;
        var firstN = sNumber.charAt(0);

        clearNumbers();

        // Calculate op1 and store digits in birth date
        op[0].number = 0;
        for (i = 0, sLen = sNumber.length; i < sLen; i += 1) {
            c = parseInt(sNumber.charAt(i));
            op[0].number += c;
            numbers[c].count++;
        }

        // Calculate op 2, 3, 4
        op[1].number = sumDigits(op[0].number);
        op[2].number = op[0].number - firstN * 2;
        op[3].number = sumDigits(op[2].number);

        sNumber = "" + op[0].number + op[1].number + op[2].number + op[3].number;

        // Store digits in OPs
        for (i = 0, sLen = sNumber.length; i < sLen; i += 1) {
            c = sNumber.charAt(i);

            numbers[c].count++;
        }

        digitsSquare = [];
        for (i = 0; i < len; i += 1) {
            digitsSquare.push(getLongText(i));
        }
    }

    function getSpiritLevel(result) {
        var spiritPromise = SpiritLevel.find({
            "min": {
                $lt: op[0].number
            },
            "max": {
                $gt: op[0].number
            }
        }).exec();

        return spiritPromise.then(function (spiritLevel) {
            result.spiritLevel = spiritLevel[0];
        });
    }

    function getDestiny(result) {
        return Destiny
            .find({number: sumDigits(op[1].number)})
            .exec()
            .then(function (data) {
                result.destiny = data[0];
            });
    }

    function getInteriorVibration(result) {
        return InteriorVibration
            .find({number: getDaySum()})
            .exec()
            .then(function (data) {
                result['interior vibration'] = data[0];
            });
    }

    function getExteriorVibration(result) {
        return ExteriorVibration
            .find({number: getMonthSum()})
            .exec()
            .then(function (data) {
                result['exterior vibration'] = data[0];
            });
    }

    function getOpNumbersDescriptions() {
        var opPromise = OperationalNumber.find().exec();

        return opPromise.then(function (operationalNumbers) {
            for (var i = 0; i < op.length; i++) {
                op[i].details = operationalNumbers[i];
            }
        });
    }

    function aggregate() {
        computeSquareNumbers();

        var promises = [];

        var resultData = {
            dateStr: '' + date.day + date.month + date.year,
            op: op,
            numbers: numbers,
            square: digitsSquare
        };
        promises.push(getSpiritLevel(resultData));
        promises.push(getOpNumbersDescriptions());
        promises.push(getDestiny(resultData));
        promises.push(getInteriorVibration(resultData));
        promises.push(getExteriorVibration(resultData));

        Promise.all(promises).then(function () {
            // All DB queries are finished - returning the result
            response.json(resultData);
        });
    }

    aggregate();
};

module.exports = pSquare;