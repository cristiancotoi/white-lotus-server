/**
 * Created by Cristian on 13/04/2016.
 */

var Person=require('../models/person');

var pSquare = function(date) {
    var numbers = {
        '0': {
            'id': '0',
            'description': 'Vid',
            count: 0
        },
        '1': {
            'id': '1',
            'description': 'Unu.',
            count: 0
        },
        '2': {
            'id': '2',
            'description': 'Doi.',
            count: 0
        },
        '3': {
            'id': '3',
            'description': 'Trei.',
            count: 0
        },
        '4': {
            'id': '4',
            'description': 'Patru.',
            count: 0
        },
        '5': {
            'id': '5',
            'description': 'Cinci.',
            count: 0
        },
        '6': {
            'id': '6',
            'description': 'Sase.',
            count: 0
        },
        '7': {
            'id': '7',
            'description': 'Sapte.',
            count: 0
        },
        '8': {
            'id': '8',
            'description': 'Opt.',
            count: 0
        },
        '9': {
            'id': '9',
            'description': 'Noua.',
            count: 0
        }
    };
    var len = Object.keys(numbers).length;

    var digitsSquare = [];

    var op = [0, 0, 0, 0];

    /*function getDaySum() {
        return sumDigits(date.day);
    }

    function getMonthSum() {
        return sumDigits(date.month);
    }

    function getYearSum() {
        return sumDigits(date.year);
    }*/

    function multiplyNumber(number, count) {
        if (count == 0) return '';
        var output = '';
        for (var i = 0; i < count; i += 1) {
            output += number;
        }
        return output;
    }

    /*function logNumbers() {
        for (var i = 1; i <= 3; i += 1) {
            var line = "";
            for (var j = 0; j < 3; j += 1) {
                line += getLongText(numbers[i + j * 3]) + '\t';
            }
            console.log(i, line.trim());
        }
        console.log(0, getLongText(numbers[0]), '\n');
    }*/

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
        op[0] = 0;
        for (i = 0, sLen = sNumber.length; i < sLen; i += 1) {
            c = parseInt(sNumber.charAt(i));
            op[0] += c;
            numbers[c].count++;
        }

        // Calculate op 2, 3, 4
        op[1] = sumDigits(op[0]);
        op[2] = op[0] - firstN * 2;
        op[3] = sumDigits(op[2]);

        sNumber = "" + op[0] + op[1] + op[2] + op[3];

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

    computeSquareNumbers();

    return {
        dateStr: '' + date.day + date.month + date.year,
        op: op,
        numbers: numbers,
        square: digitsSquare
    };
};

module.exports = pSquare;