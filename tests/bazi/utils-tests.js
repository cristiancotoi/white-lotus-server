var chai = require('chai');
var chaiSubset = require('chai-subset');
chai.use(chaiSubset);
var expect = chai.expect; // we are using the "expect" style of Chai

var moment = require('moment');

var Utils = require('./../../bazi_module/utils');

describe('BaZi utils age calculation', function () {
    this.timeout(2000);

    it('check age calculation for a moment object - default granulation', function () {
        var date = moment([1984, 4, 23]);
        var now = moment([2016, 4, 23]);

        var utils = Utils(date);
        expect(utils.getAge(now)).to.equal(32);
    });

    it('check age calculation for a custom object - default granulation', function () {
        var date = {
            day: 23, month: 4, year: 1984
        };
        var now = moment([2016, 4, 23]);

        var utils = Utils(date);
        expect(utils.getAge(now)).to.equal(32);
    });

    it('check age calculation for a moment object with year granulation', function () {
        var date = moment([1984, 4, 23]);
        var now = moment([2016, 4, 23]);

        var utils = Utils(date);
        expect(utils.getAge(now, 'year')).to.equal(32);
    });

    it('check age calculation for a custom object with year granulation', function () {
        var date = {
            day: 23, month: 4, year: 1984
        };
        var now = moment([2016, 4, 23]);

        var utils = Utils(date);
        expect(utils.getAge(now, 'year')).to.equal(32);
    });

    it('check age calculation for a moment object with month granulation', function () {
        var date = moment([1984, 4, 23]);
        var now = moment([2016, 4, 23]);

        var utils = Utils(date);
        expect(utils.getAge(now, 'month')).to.equal(384);
    });

    it('check age calculation for a custom object with month granulation', function () {
        var date = {
            day: 23, month: 4, year: 1984
        };
        var now = moment([2016, 4, 23]);

        var utils = Utils(date);
        expect(utils.getAge(now, 'month')).to.equal(384);
    });

    it('check age in years and months', function () {
        var date = {
            day: 23, month: 4, year: 1984
        };
        var now = moment([2016, 10, 23]);

        var utils = Utils(date);
        expect(utils.getAgeString(now).year).to.equal(32);
        expect(utils.getAgeString(now).months).to.equal(6);
    });

    it('check birthday as moment()', function () {
        var date = {
            day: 22, month: 4, year: 1984, hours: 22, minutes: 50
        };

        var utils = Utils(date);
        var mom = utils.getMoment();

        expect(mom.year()).to.equal(1984);
        expect(mom.date()).to.equal(22);
        expect(mom.minutes()).to.equal(50);
    });

    it('check current luck pillar simple test', function () {
        var date = {
            day: 22, month: 0, year: 1984, hours: 22, minutes: 50
        };

        var utils = Utils(date);
        expect(utils.getCurrentLuckPillar(4)).to.equal(2);
    });

    it('check current luck pillar edge case - before', function () {
        var date = {
            day: 22, month: 3, year: 1984, hours: 22, minutes: 50
        };

        var utils = Utils(date);
        expect(utils.getCurrentLuckPillar(4, moment([2018, 3, 22]))).to.equal(2);
    });

    it('check current luck pillar edge case - after', function () {
        var date = {
            day: 22, month: 3, year: 1984, hours: 22, minutes: 50
        };

        var utils = Utils(date);
        expect(utils.getCurrentLuckPillar(4, moment([2018, 3, 24]))).to.equal(3);
    });

});