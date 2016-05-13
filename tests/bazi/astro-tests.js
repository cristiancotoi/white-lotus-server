var chai = require('chai');
var chaiSubset = require('chai-subset');
chai.use(chaiSubset);
var expect = chai.expect; // we are using the "expect" style of Chai

var AstroCalc = require('./../../bazi_module/astro');

describe('BaZi astrology calculations', function () {
    this.timeout(2000);

    it('calculate for 22 4 1984 22 50', function () {
        var date = {
            day: 22, month: 4, year: 1984, hour: 22, minute: 50,
            tz: 2, longitude: 28, sex: 'M'
        };

        var calculator = AstroCalc();
        var result = calculator.getData(date);
        expect(result).to.containSubset({
            MM: 4,
            YY: 1984,
            HR: 22.7,
            GEN: 1,
            JZJD: 2445813.4458333333,
            trueLong: 32.89808597697629
        });
    });

    it('calculate for 27 1 1985 23 55', function () {
        var date = {
            day: 27, month: 1, year: 1985, hour: 23, minute: 50,
            tz: 2, longitude: 28, sex: 'F'
        };

        var calculator = AstroCalc();
        var result = calculator.getData(date);
        console.log(result);
        expect(result).to.containSubset({
            MM: 1,
            YY: 1985,
            HR: 23.7,
            GEN: -1,
            JZJD: 2446093.4875,
            trueLong: 307.9230460731087
        });
    });

    it('calculate for 24 12 1948 1 20', function () {
        var date = {
            day: 24, month: 12, year: 1948, hour: 1, minute: 20,
            tz: 2, longitude: 28, sex: 'F'
        };

        var calculator = AstroCalc();
        var result = calculator.getData(date);
        console.log(result);
        expect(result).to.containSubset({
            MM: 12,
            YY: 1948,
            HR: 1.2,
            GEN: -1,
            JZJD: 2432909.55,
            trueLong: 272.0739100092069
        });
    });

    it('calculate for 24 1 2004 3 40', function () {
        var date = {
            day: 24, month: 1, year: 2004, hour: 3, minute: 40,
            tz: 2, longitude: 28, sex: 'F'
        };

        var calculator = AstroCalc();
        var result = calculator.getData(date);
        console.log(result);
        expect(result).to.containSubset({
            MM: 1,
            YY: 2004,
            HR: 3.533333333333333,
            GEN: -1,
            JZJD: 2453028.6472222223,
            trueLong: 303.39651704783387
        });
    });

});