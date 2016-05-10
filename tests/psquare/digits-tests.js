var chai = require('chai');
var chaiSubset = require('chai-subset');
chai.use(chaiSubset);
var expect = chai.expect; // we are using the "expect" style of Chai

var Digits = require('./../../psquare_module/digits');

describe('Pythagorean Square digits tests', function () {
    it('basic digits initialization', function () {
        var digits = Digits();
        var len = digits.length;
        expect(len).to.equal(10);
        for (var i = 0; i < len; i++) {
            expect(digits.get(i).count).to.equal(0);
        }
    });

    it('basic digits incrementation', function () {
        var digits = Digits();
        var len = digits.length;
        digits.increment(2);
        for (var i = 0; i < len; i++) {
            var expected = i == 2 ? 1 : 0;
            expect(digits.get(i).count).to.equal(expected);
        }
    });

    it('double digits incrementation', function () {
        var digits = Digits();
        var len = digits.length;
        digits.increment(2);
        digits.increment(2);
        for (var i = 0; i < len; i++) {
            var expected = i == 2 ? 2 : 0;
            expect(digits.get(i).count).to.equal(expected);
        }
    });

    it('clearing digits', function () {
        var digits = Digits();
        var len = digits.length;
        digits.increment(2);
        digits.increment(4);
        digits.clear();
        for (var i = 0; i < len; i++) {
            expect(digits.get(i).count).to.equal(0);
        }
    });

    it('get long text', function () {
        var digits = Digits();
        digits.increment(2);
        digits.increment(2);
        digits.increment(5);

        expect(digits.getLongText(2)).to.equal('22');
        expect(digits.getLongText(5)).to.equal('5');
    });

});