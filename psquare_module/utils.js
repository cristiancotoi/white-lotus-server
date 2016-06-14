'use strict';

var moment = require('moment');
var _ = require('underscore');

var utils = function (date, tz) {
    function getMoment() {
        var result = moment()
            .year(date.year)
            .month(date.month)
            .date(date.day);
        if (!_.isUndefined(date.hour) & date.hour != null) {
            result
                .hour(date.hour)
                .minute(date.minute);
        }
        if (_.isFunction(result.tz) && !_.isUndefined(tz)) {
            try {
                result.tz(tz);
            } catch (ex) {
            }
        }
        return result;
    }

    function sumDigits(number) {
        var sNumber = "" + number;
        var output = 0;
        for (var i = 0, sLen = sNumber.length; i < sLen; i += 1) {
            output += parseInt(sNumber.charAt(i));
        }
        return output;
    }

    function doubleSumDigits(number) {
        return sumDigits(sumDigits(number));
    }


    function getDaySum() {
        //Double sum to make sure we only get 1 digit
        return doubleSumDigits(date.day);
    }

    function getMonthSum() {
        return sumDigits(date.month);
    }

    function getYearSum() {
        // triple sum, because 1999 -> 28 -> 10 -> 1
        return sumDigits(doubleSumDigits(date.year));
    }

    function getCosmicVibration() {
        return sumDigits(sumDigits(
            date.year.toString().substr(2, 2)
        ));
    }

    function extractDigitsFromBirthDay(date, op, digits) {
        var sNumber = "" + date.day + date.month + date.year;
        var firstN = sNumber.charAt(0);
        var i, c, sLen;

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
    }

    function extractDigitsFromOP(op, digits) {
        var i, c;
        var sLen;

        var sNumber = "" + op[0].number + op[1].number + op[2].number + op[3].number;

        // Store digits in OPs
        for (i = 0, sLen = sNumber.length; i < sLen; i += 1) {
            c = sNumber.charAt(i);

            digits.increment(c);
        }
        return i;
    }

    return {
        getMoment: getMoment,

        sumDigits: sumDigits,
        doubleSumDigits: doubleSumDigits,
        getDaySum: getDaySum,
        getMonthSum: getMonthSum,
        getCosmicVibration: getCosmicVibration,
        getYearFullSum: getYearSum,

        extractDigitsFromBirthDay: extractDigitsFromBirthDay,
        extractDigitsFromOP: extractDigitsFromOP
    };
};

module.exports = utils;