var chai = require('chai');
var chaiSubset = require('chai-subset');
chai.use(chaiSubset);
var expect = chai.expect; // we are using the "expect" style of Chai

var connectToDb = require('./../../utils/db-utils');

var BaZi = require('./../../bazi_module/main');

describe('BaZi basic calculations', function () {
    this.timeout(3000);
    before(function () {
        connectToDb();
    });

    it('check basic output values', function (done) {
        var person = {
            name: 'N',
            surname: 'S',
            date: {
                day: 24, month: 12, year: 1948, hour: 1, minute: 20,
                tz: 2, longitude: 28, sex: 'F'
            }
        };

        function asserts(result) {
            expect(result.name).to.equal('N');
            expect(result.surname).to.equal('S');
            done();
        }

        BaZi(person, {json: asserts});
    });

    it('check chart data quality', function (done) {
        var person = {
            date: {
                day: 24, month: 12, year: 1948, hour: 1, minute: 20,
                tz: 2, longitude: 28, sex: 'F'
            }
        };

        function asserts(result) {
            expect(result.phases.length).to.equal(5);
            expect(result.heavenlyStems.length).to.equal(10);
            expect(result.earthlyBranches.length).to.equal(12);
            done();
        }

        BaZi(person, {json: asserts});
    });

    it('check chart chart pillars', function (done) {
        var person = {
            date: {
                day: 24, month: 12, year: 1948, hour: 1, minute: 20,
                tz: 2, longitude: 28, sex: 'F'
            }
        };

        function asserts(result) {
            //console.log(result);
            done();
        }

        BaZi(person, {json: asserts});
    });

});