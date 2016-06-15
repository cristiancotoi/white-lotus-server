var chai = require('chai');
var chaiSubset = require('chai-subset');
chai.use(chaiSubset);
var expect = chai.expect; // we are using the "expect" style of Chai

var Utils = require('./../../psquare_module/utils');

describe('Pythagorean Square utility tests', function () {
    it('simple calculations for single digits sum', function () {
        var utils = Utils({});
        expect(utils.sumDigits(1)).to.equal(1);
        expect(utils.sumDigits(11)).to.equal(2);
        expect(utils.sumDigits(19)).to.equal(10);
        expect(utils.sumDigits(29)).to.equal(11);
    });

    it('simple calculations for double digits sum', function () {
        var utils = Utils({});
        expect(utils.doubleSumDigits(1)).to.equal(1);
        expect(utils.doubleSumDigits(11)).to.equal(2);
        expect(utils.doubleSumDigits(19)).to.equal(1);
        expect(utils.doubleSumDigits(29)).to.equal(2);
    });

    it('check day digits summing', function () {
        expect(Utils({day: 23}).getDaySum()).to.equal(5);
        expect(Utils({day: 29}).getDaySum()).to.equal(2);
    });

    it('check month digits summing', function () {
        expect(Utils({month: 1}).getMonthSum()).to.equal(1);
        expect(Utils({month: 12}).getMonthSum()).to.equal(3);
    });

    it('check year digits summing', function () {
        expect(Utils({year: 1950}).getCosmicVibration()).to.equal(5);
        expect(Utils({year: 1959}).getCosmicVibration()).to.equal(5);
        expect(Utils({year: 1999}).getCosmicVibration()).to.equal(9);
    });

    it('check full year digits summing', function () {
        expect(Utils({year: 1950}).getYearFullSum()).to.equal(6);
        expect(Utils({year: 1959}).getYearFullSum()).to.equal(6);
        expect(Utils({year: 1999}).getYearFullSum()).to.equal(1);
    });

    it('check moment quality without hour', function () {
        expect(Utils({
            year: 1950,
            month: 1,
            day: 1
        })
            .getMoment()
            .toISOString()).to.equal('1950-01-01T00:00:00.000Z');
    });

    it('check moment quality max month', function () {
        expect(Utils({
            year: 1950,
            month: 12,
            day: 1
        })
            .getMoment()
            .toISOString()).to.equal('1950-12-01T00:00:00.000Z');
    });

    it('check moment quality with time', function () {
        expect(Utils({
            year: 1950,
            month: 12,
            day: 1,
            hour: 5,
            minute: 50
        })
            .getMoment()
            .toISOString()).to.equal('1950-12-01T05:50:00.000Z');
    });
});