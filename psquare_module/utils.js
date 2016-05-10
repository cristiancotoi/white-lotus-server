'use strict';

var utils = function (date) {
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
            date.year.toString().substr(2,2)
        ));
    }

    return {
        sumDigits: sumDigits,
        doubleSumDigits: doubleSumDigits,
        getDaySum: getDaySum,
        getMonthSum: getMonthSum,
        getCosmicVibration: getCosmicVibration,
        getYearFullSum: getYearSum
    };
};

module.exports = utils;