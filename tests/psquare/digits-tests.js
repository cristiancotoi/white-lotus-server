let chai = require('chai');
let chaiSubset = require('chai-subset');
chai.use(chaiSubset);
let expect = chai.expect; // we are using the "expect" style of Chai

let Digits = require('./../../psquare_module/digits');

describe('Pythagorean Square digits tests', function () {
    it('basic digits initialization', function () {
        let digits = Digits();
        let len = digits.length;
        expect(len).to.equal(10);
        for (let i = 0; i < len; i++) {
            expect(digits.get(i).count).to.equal(0);
        }
    });

    it('basic digits incrementation', function () {
        let digits = Digits();
        let len = digits.length;
        digits.increment(2);
        for (let i = 0; i < len; i++) {
            let expected = i == 2 ? 1 : 0;
            expect(digits.get(i).count).to.equal(expected);
        }
    });

    it('double digits incrementation', function () {
        let digits = Digits();
        let len = digits.length;
        digits.increment(2);
        digits.increment(2);
        for (let i = 0; i < len; i++) {
            let expected = i == 2 ? 2 : 0;
            expect(digits.get(i).count).to.equal(expected);
        }
    });

    it('clearing digits', function () {
        let digits = Digits();
        let len = digits.length;
        digits.increment(2);
        digits.increment(4);
        digits.clear();
        for (let i = 0; i < len; i++) {
            expect(digits.get(i).count).to.equal(0);
        }
    });

    it('get long text', function () {
        let digits = Digits();
        digits.increment(2);
        digits.increment(2);
        digits.increment(5);

        expect(digits.getLongText(2)).to.equal('22');
        expect(digits.getLongText(5)).to.equal('5');
    });

    it('line weight invalid parameter', function () {
        let digits = Digits();
        try {
            digits.getLineWeight();
            expect(true).to.equal('Validation for undefined value failed')
        } catch (ex) {
            expect(ex).to.equal('Line name cannot be undefined');
        }
    });

    it('combo matching per digit', function () {
        let digits = Digits();
        let combo = {
            description: 'Înclinație spre actorie.',
            max9: 2,
            min9: 2,
            max6: 0,
            min6: 0,
            max4: 99,
            min4: 1,
            max2: 0,
            min2: 0
        };
        digits.increment(4);
        digits.increment(6);
        digits.increment(9);
        digits.increment(9);

        expect(digits.comboMatchesDigit(combo, 4)).to.equal(true);
        expect(digits.comboMatchesDigit(combo, 9)).to.equal(true);
        expect(digits.comboMatchesDigit(combo, 5)).to.equal(true);
        expect(digits.comboMatchesDigit(combo, 6)).to.equal(false);
    });

    it('combo not matching square', function () {
        let digits = Digits();
        let combo = {
            description: 'Înclinație spre actorie.',
            max9: 2,
            min9: 2,
            max6: 0,
            min6: 0,
            max4: 99,
            min4: 1,
            max2: 0,
            min2: 0
        };
        digits.increment(4);
        digits.increment(6);
        digits.increment(9);
        digits.increment(9);

        expect(digits.comboMatchesSquare(combo)).to.equal(false);
    });

    it('combo matching square', function () {
        let digits = Digits();
        let combo = {
            max9: 2,
            min9: 2,
            max6: 3,
            min6: 1,
            max4: 99,
            min4: 1,
            max2: 0,
            min2: 0
        };
        digits.increment(4);
        digits.increment(6);
        digits.increment(9);
        digits.increment(9);

        expect(digits.comboMatchesSquare(combo)).to.equal(true);
    });

});