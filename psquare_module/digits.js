'use strict';

var _ = require("underscore");

var digits = function () {
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

    function clearNumbers() {
        for (var i = 0; i < len; i += 1) {
            numbers[i].count = 0;
        }
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

    function getAllDigitsLongNames() {
        var digitsSquare = [];
        for (var i = 0, len = 10; i < len; i += 1) {
            digitsSquare.push(getLongText(i));
        }
        return digitsSquare;
    }

    function comboMatchesDigit(combo, digitId) {
        var count = numbers[digitId].count;
        var result;
        if (_.isUndefined(combo['min' + digitId]) || _.isUndefined(combo['min' + digitId])) {
            // If no rule is present we consider this a whildcard '*' so it matches
            result = true;
        } else {
            result = combo['min' + digitId] <= count && count <= combo['max' + digitId];
        }
        return result;
    }

    function comboMatchesSquare(combo) {
        var result = true;
        for (var i = 0; i <= 9; i++) {
            var matchDigit = comboMatchesDigit(combo, i);
            if (!matchDigit) {
                result = false;
                break;
            }
        }
        return result;
    }

    function getDigits() {
        var result = [];
        _.each(numbers, function (n) {
            result[n.id] = n.count;
        });
        return result;
    }

    /**
     * @param line 3 letters string
     */
    function getLineWeight(line) {
        if (_.isUndefined(line)) {
            throw new Error('Param cannot be undefined');
        }
        var word = '' + line;
        var result = {count: 0, sum: 0, line: ''};
        for (var i = 0, len = word.length; i < len; i++) {
            var digit = numbers[word[i]];
            result.count += digit.count;
            result.sum += digit.count * digit.id;
        }
        result.line = line;
        return result;
    }

    return {
        increment: function (digit) {
            numbers[digit].count++;
        },
        get: function (digit) {
            return numbers[digit];
        },
        clear: clearNumbers,

        length: 10,
        getLongText: getLongText,
        getAllDigitsLongNames: getAllDigitsLongNames,

        comboMatchesDigit: comboMatchesDigit,
        comboMatchesSquare: comboMatchesSquare,

        getLineWeight: getLineWeight,
        getDigits: getDigits
    };
};

module.exports = digits;