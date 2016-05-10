'use strict';

var Promise = require("bluebird");

//var Person = require('../models/person');
var User = require('../models/user');

var OperationalNumber = require('../models/psquare/op-number');
var SpiritLevel = require('../models/psquare/spirit-level');
var Destiny = require('../models/psquare/destiny');
var InteriorVibration = require('../models/psquare/int-vibration');
var ExteriorVibration = require('../models/psquare/ext-vibration');

var psUtils = require('./utils');
var digits = require('./digits')();

var pSquare = function (person, response) {
    if(person === null || person === undefined) {
        return;
    }

    var date = person.date;
    var utils = psUtils(date);
    var len = digits.length;
    var digitsSquare = [];
    var op = [
        {position: 1, number: -1},
        {position: 2, number: -1},
        {position: 3, number: -1},
        {position: 4, number: -1}
    ];

    function sumDigits(number) {
        var sNumber = "" + number;
        var output = 0;
        for (var i = 0, sLen = sNumber.length; i < sLen; i += 1) {
            output += parseInt(sNumber.charAt(i));
        }
        return output;
    }

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
        op[1].number = sumDigits(op[0].number);
        op[2].number = op[0].number - firstN * 2;
        op[3].number = sumDigits(op[2].number);

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

    function getSpiritLevel(result) {
        var spiritPromise = SpiritLevel.find({
            "min": {
                $lte: op[0].number
            },
            "max": {
                $gte: op[0].number
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
            .find({number: utils.getDaySum()})
            .exec()
            .then(function (data) {
                result['interior vibration'] = data[0];
            });
    }

    function getExteriorVibration(result) {
        return ExteriorVibration
            .find({number: utils.getMonthSum()})
            .exec()
            .then(function (data) {
                result['exterior vibration'] = data[0];
            });
    }

    function getOpDigitsDescriptions() {
        var opPromise = OperationalNumber.find().exec();

        return opPromise.then(function (operationalNumbers) {
            for (var i = 0; i < op.length; i++) {
                op[i].details = operationalNumbers[i];
            }
        });
    }

    function aggregate() {
        computeSquareDigits();

        var promises = [];

        var resultData = {
            dateStr: '' + date.day + date.month + date.year,
            op: op,
            digits: digits,
            square: digitsSquare
        };
        promises.push(getSpiritLevel(resultData));
        promises.push(getOpDigitsDescriptions());
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