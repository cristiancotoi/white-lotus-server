'use strict';

var moment = require("moment-timezone");
var _ = require('underscore');

var utils = function (date, tz) {
    function getMoment() {
        moment.tz.setDefault('UTC');
        var dateArray = [
            date.year,
            date.month - 1,
            date.day
        ];
        if (!_.isUndefined(date.hour) & date.hour != null) {
            dateArray.push(date.hour, date.minute);
        }

        return moment(dateArray, tz);
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

    function getLuckChartDigits() {
        var luckChartNumber = date.year * date.month * date.day;
        var sLen, i;
        var luckChartDigits = [];
        var sNumber = '' + luckChartNumber;

        for (i = 0, sLen = sNumber.length; i < sLen; i += 1) {
            luckChartDigits.push({
                position: i + 1,
                value: parseInt(sNumber.charAt(i))
            });
        }

        return {
            number: luckChartNumber,
            digits: luckChartDigits
        };
    }

    function getYearsMatrix(colCount, count) {
        if (_.isUndefined(count)) {
            count = 80;
        }
        if (colCount !== parseInt(colCount, 10)) {
            throw "Invalid parameter: " + colCount;
        }

        var rowIdx, colIdx;
        var resultMatrix = [];
        var year = date.year;
        var instances = 0;

        for (rowIdx = 0; rowIdx < 100; rowIdx++) {
            var row = [];
            for (colIdx = 0; colIdx < colCount; colIdx++, instances++) {
                row[colIdx] = year;
                year++;
            }
            resultMatrix.push(row);

            if (instances >= count) {
                break;
            }
        }

        return resultMatrix;
    }

    function getChallenges() {
        var c1 = Math.abs(getDaySum() - getMonthSum());
        var c2 = Math.abs(getDaySum() - getYearSum());
        var c3 = Math.abs(c1 - c2);
        var c4 = Math.abs(getMonthSum() - getYearSum());

        return [
            {position: 1, value: c1},
            {position: 2, value: c2},
            {position: 3, value: c3},
            {position: 4, value: c4}
        ];
    }

    function getChAndOpIntervals(destinyDigit) {
        var first = 36 - destinyDigit;
        return [
            {position: 1, start: 0, end: first},
            {position: 2, start: first + 1, end: first + 9},
            {position: 3, start: first + 10, end: first + 18},
            {position: 4, start: first + 19, end: first + 27}
        ];
    }

    function getOpportunities() {
        var o1 = sumDigits(getDaySum() + getMonthSum());
        var o2 = sumDigits(getDaySum() + getYearSum());
        var o3 = sumDigits(o1 + o2);
        var o4 = sumDigits(getMonthSum() + getYearSum());

        return [
            {position: 1, value: o1},
            {position: 2, value: o2},
            {position: 3, value: o3},
            {position: 4, value: o4}
        ];
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
        extractDigitsFromOP: extractDigitsFromOP,

        getChallenges: getChallenges,
        getChallengeAndOpportunityIntervals: getChAndOpIntervals,
        getOpportunities: getOpportunities,
        getLuckChartDigits: getLuckChartDigits,
        getYearsMatrix: getYearsMatrix
    };
};

module.exports = utils;