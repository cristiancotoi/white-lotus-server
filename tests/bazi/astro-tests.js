var chai = require('chai');
var chaiSubset = require('chai-subset');
chai.use(chaiSubset);
var expect = chai.expect; // we are using the "expect" style of Chai

var moment = require('moment');
var AstroCalc = require('./../../bazi_module/astro');

describe('BaZi astrology calculations', function () {
    this.timeout(2000);

    it('test hour subtraction without dst', function () {
        var date = {
            day: 22, month: 4, year: 1984, hour: 22, minute: 50
        };

        var calculator = AstroCalc();
        var result = calculator.subtractHour(date, 0);
        expect(result).to.containSubset({
            day: 22, month: 4, year: 1984, hour: 22, minute: 50
        });
    });

    it('test hour subtraction with dst within same day', function () {
        var date = {
            day: 22, month: 4, year: 1984, hour: 22, minute: 50
        };

        var calculator = AstroCalc();
        var result = calculator.subtractHour(date, 1);
        expect(result).to.containSubset({
            day: 22, month: 4, year: 1984, hour: 21, minute: 50
        });
    });

    it('test hour subtraction with dst moving to previous day', function () {
        var date = {
            day: 23, month: 4, year: 1984, hour: 0, minute: 5
        };

        var calculator = AstroCalc();
        var result = calculator.subtractHour(date, 1);
        expect(result).to.containSubset({
            day: 22, month: 4, year: 1984, hour: 23, minute: 5
        });
    });

    it('test hour and minutes subtraction', function () {
        var date = {
            day: 23, month: 4, year: 1984, hour: 0, minute: 5
        };

        var calculator = AstroCalc();
        var result = calculator.subtractHour(date, 1, 15);
        expect(result).to.containSubset({
            day: 22, month: 4, year: 1984, hour: 22, minute: 50
        });
    });

    it('calculate for 23 4 1984 0 5', function () {
        var person = {
            date: {
                day: 23, month: 4, year: 1984, hour: 0, minute: 5
            },
            tz: 2, longitude: 28, gender: 'M', dst_active_at_birth: true
        };

        var calculator = AstroCalc();
        var result = calculator.getData(person);
        expect(result).to.containSubset({
            month: 4,
            year: 1984,
            hour: 22.95,
            hour_int: 22,
            gender: 1
        });
    });

    it('calculate for 28 1 1985 0 5', function () {
        var person = {
            date: {
                day: 28, month: 1, year: 1985, hour: 0, minute: 5
            },
            tz: 2, longitude: 28, gender: 'F'
        };

        var calculator = AstroCalc();
        var result = calculator.getData(person);
        expect(result).to.containSubset({
            month: 1,
            year: 1985,
            hour: 23.95,
            hour_int: 23,
            minute: 57,
            gender: -1
        });
    });

    it('calculate for 28 1 1985 0 10', function () {
        var person = {
            date: {
                // 0:10 brings this close to the edge of the previous day
                day: 28, month: 1, year: 1985, hour: 0, minute: 10
            },
            tz: 2, longitude: 28.04, gender: 'F'
        };

        var calculator = AstroCalc();
        var result = calculator.getData(person);
        expect(result).to.containSubset({
            month: 1,
            year: 1985,
            hour: 0.03333333333333333,
            hour_int: 0,
            minute: 2,
            gender: -1
        });
    });

    it('calculate for 24 12 1948 1 20', function () {
        var person = {
            date: {
                day: 24, month: 12, year: 1948, hour: 1, minute: 20
            },
            tz: 2, longitude: 28, gender: 'F', dst_active_at_birth: false
        };

        var calculator = AstroCalc();
        var result = calculator.getData(person);
        expect(result).to.containSubset({
            month: 12,
            year: 1948,
            hour: 1.2,
            hour_int: 1,
            minute: 12,
            gender: -1/*,
            JZJD: 2432909.55,
            trueLong: 272.0739100092069*/
        });
    });

    it('calculate for 24 1 2004 3 40', function () {
        var person = {
            date: {
                day: 24, month: 1, year: 2004, hour: 3, minute: 40
            },
            tz: 2, longitude: 27.59, gender: 'F'
        };

        var calculator = AstroCalc();
        var result = calculator.getData(person);
        expect(result).to.containSubset({
            month: 1,
            year: 2004,
            hour: 3.5,
            hour_int: 3,
            minute: 30,
            gender: -1/*,
            JZJD: 2453028.6472222223,
            trueLong: 303.39651704783387*/
        });
    });

    it('check dst difference', function () {
        var person = {
            date: {
                day: 23, month: 4, year: 1984, hour: 0, minute: 5
            },
            tz: 2, longitude: 28, gender: 'M', dst_active_at_birth: true
        };
        var personWithoutDst = {
            date: {
                day: 22, month: 4, year: 1984, hour: 23, minute: 5
            },
            tz: 2, longitude: 28, gender: 'M', dst_active_at_birth: false
        };

        var calculator = AstroCalc();
        var resultWithDst = calculator.getData(person);
        var resultWithoutDst = calculator.getData(personWithoutDst);
        delete resultWithDst.moment;
        delete resultWithoutDst.moment;
        expect(resultWithDst).to.deep.equal(resultWithoutDst);
    });

    it('check dst & longitude difference', function () {
        var person = {
            date: {
                day: 23, month: 4, year: 1984, hour: 0, minute: 5
            },
            tz: 2, longitude: 28, gender: 'M', dst_active_at_birth: true
        };

        var calculator = AstroCalc();
        var resultWithDst = calculator.getData(person);
        expect(resultWithDst.minute).to.equal(57);
        expect(Math.floor(resultWithDst.hour)).to.equal(22);
        expect(resultWithDst.day).to.equal(22);
    });

    it('check moment object export', function () {
        var person = {
            date: {
                day: 28, month: 6, year: 1986
            },
            tz: 2, longitude: 28, gender: 'M'
        };

        var calculator = AstroCalc();
        var result = calculator.getData(person);
        expect(moment(result.moment).toISOString()).to.contain('1986-06-28T00:00');
    });

});