'use strict';

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


    return {
        increment: function(digit) {
            numbers[digit].count++;
        },
        get: function(digit) {
            return numbers[digit];
        },
        clear: clearNumbers,

        length: 10,
        getLongText: getLongText
    };
};

module.exports = digits;