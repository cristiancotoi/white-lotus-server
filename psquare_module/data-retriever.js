'use strict';

var Promise = require("bluebird");
var _ = require("underscore");

var User = require('../models/user');

var OperationalNumber = require('../models/psquare/op-number');
var SpiritLevel = require('../models/psquare/spirit-level');
var Destiny = require('../models/psquare/destiny');
var InteriorVibration = require('../models/psquare/int-vibration');
var ExteriorVibration = require('../models/psquare/ext-vibration');
var CosmicVibration = require('../models/psquare/cosmic-vibration');

var SquareMeaning = require('../models/psquare/sq-meaning');
var SquareCombo = require('../models/psquare/sq-combo');

var dataRetriever = function (utils, response) {
    function getSpiritLevel(result, level) {
        var spiritPromise = SpiritLevel.find({
            "min": {
                $lte: level
            },
            "max": {
                $gte: level
            }
        }).exec();

        return spiritPromise.then(function (spiritLevel) {
            result.spiritLevel = spiritLevel[0];
        });
    }

    function getDestiny(result, destinyNumber) {
        return Destiny
            .find({number: destinyNumber})
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

    function getCosmicVibration(result) {
        return CosmicVibration
            .find({number: utils.getCosmicVibration()})
            .exec()
            .then(function (data) {
                result['cosmic vibration'] = data[0];
            });
    }

    function getOpDigitsDescriptions(op) {
        var opPromise = OperationalNumber.find().exec();

        return opPromise.then(function (operationalNumbers) {
            for (var i = 0; i < op.length; i++) {
                op[i].details = operationalNumbers[i];
            }
        });
    }

    function getSqMeaning(resultSqMeaning, digit, count) {
        var promise = SquareMeaning.find({
            "number": {$eq: digit},
            "min": {$lte: count},
            "max": {$gte: count}
        }).exec();

        return promise.then(function (sqMeaning) {
            resultSqMeaning[digit] = sqMeaning/*[0].toObject()*/;
        });
    }

    function getCombos(result) {
        var digits = result.digits;
        // As we can't match the whole onto the part, we have to pull
        // all the combos and match the combo over the whole
        return SquareCombo
            .find()
            .exec()
            .then(function (allCombos) {
                var matchingCombos = [];
                var len = _.size(allCombos);
                for (var i = 0; i < len; i++) {
                    var combo = allCombos[i];
                    if (digits.comboMatchesSquare(combo)) {
                        matchingCombos.push(combo);
                    }
                }
                result['sq combos'] = matchingCombos;
                return matchingCombos;
            });
    }

    function aggregate(resultData, op) {
        var promises = [];
        resultData.sqMeaning = [];

        promises.push(getSpiritLevel(resultData, op[0].number));
        promises.push(getOpDigitsDescriptions(op));
        promises.push(getDestiny(resultData, utils.sumDigits(op[1].number)));
        promises.push(getInteriorVibration(resultData));
        promises.push(getExteriorVibration(resultData));
        promises.push(getCosmicVibration(resultData));
        promises.push(getCombos(resultData));

        var digits = resultData.digits;
        var digitLen = digits.length;
        // Start from 1, as we don't have 0 yet
        for (var i = 1; i < digitLen; i++) {
            var digit = digits.get(i);
            promises.push(getSqMeaning(resultData.sqMeaning, digit.id, digit.count));
        }

        Promise.all(promises).then(function () {
            // All DB queries are finished - returning the result
            response.json(resultData);
        });
    }

    return {
        getAllInto: aggregate
    };
};

module.exports = dataRetriever;