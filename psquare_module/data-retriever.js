'use strict';

var Promise = require("bluebird");

var User = require('../models/user');

var OperationalNumber = require('../models/psquare/op-number');
var SpiritLevel = require('../models/psquare/spirit-level');
var Destiny = require('../models/psquare/destiny');
var InteriorVibration = require('../models/psquare/int-vibration');
var ExteriorVibration = require('../models/psquare/ext-vibration');

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

    function getOpDigitsDescriptions(op) {
        var opPromise = OperationalNumber.find().exec();

        return opPromise.then(function (operationalNumbers) {
            for (var i = 0; i < op.length; i++) {
                op[i].details = operationalNumbers[i];
            }
        });
    }

    function aggregate(resultData, op) {
        var promises = [];

        promises.push(getSpiritLevel(resultData, op[0].number));
        promises.push(getOpDigitsDescriptions(op));
        promises.push(getDestiny(resultData, utils.sumDigits(op[1].number)));
        promises.push(getInteriorVibration(resultData));
        promises.push(getExteriorVibration(resultData));

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