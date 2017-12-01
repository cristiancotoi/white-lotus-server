'use strict';

let moment = require("moment-timezone");
let _ = require('underscore');

let CommonUtils = require('../common_module/utils');

let utils = function (date, tz) {
    function getMoment() {
        return CommonUtils().getMoment(date);
    }

    function sumDigits(number) {
        let sNumber = "" + number;
        let output = 0;
        for (let i = 0, sLen = sNumber.length; i < sLen; i += 1) {
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
        let sNumber = "" + date.day + date.month + date.year;
        let firstN = sNumber.charAt(0);
        let i, c, sLen;

        // Calculate op1 and store digits in birth date
        op[0].number = 0;
        for (i = 0, sLen = sNumber.length; i < sLen; i += 1) {
            c = parseInt(sNumber.charAt(i));
            op[0].number += c;
            digits.increment(c);
        }

        // Calculate op 2, 3, 4
        op[1].number = sumDigits(op[0].number);
        op[2].number = Math.abs(op[0].number - firstN * 2);
        op[3].number = sumDigits(op[2].number);
    }

    function extractDigitsFromOP(op, digits) {
        let i, c;
        let sLen;

        let sNumber = "" + op[0].number + op[1].number + op[2].number + op[3].number;

        // Store digits in OPs
        for (i = 0, sLen = sNumber.length; i < sLen; i += 1) {
            c = sNumber.charAt(i);

            digits.increment(c);
        }
        return i;
    }

    function getLuckChartDigits() {
        let luckChartNumber = date.year * date.month * date.day;
        let sLen, i;
        let luckChartDigits = [];
        let sNumber = '' + luckChartNumber;

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

        let rowIdx, colIdx;
        let resultMatrix = [];
        let year = date.year;
        let instances = 0;

        for (rowIdx = 0; rowIdx < 100; rowIdx++) {
            let row = [];
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
        let c1 = Math.abs(getDaySum() - getMonthSum());
        let c2 = Math.abs(getDaySum() - getYearSum());
        let c3 = Math.abs(c1 - c2);
        let c4 = Math.abs(getMonthSum() - getYearSum());

        return [
            {position: 1, value: c1},
            {position: 2, value: c2},
            {position: 3, value: c3},
            {position: 4, value: c4}
        ];
    }

    function getChAndOpIntervals(destinyDigit) {
        let first = 36 - destinyDigit;
        return [
            {position: 1, min: 0, max: first},
            {position: 2, min: first + 1, max: first + 9},
            {position: 3, min: first + 10, max: first + 18},
            {position: 4, min: first + 19, max: first + 27}
        ];
    }

    function getOpportunities() {
        let o1 = sumDigits(getDaySum() + getMonthSum());
        let o2 = sumDigits(getDaySum() + getYearSum());
        let o3 = sumDigits(o1 + o2);
        let o4 = sumDigits(getMonthSum() + getYearSum());

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