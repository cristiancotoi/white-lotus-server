var chai = require('chai');
var chaiSubset = require('chai-subset');
chai.use(chaiSubset);
var expect = chai.expect; // we are using the "expect" style of Chai

var BaZi = require('./../../bazi_module/main');

describe('BaZi basic calculations', function () {
    this.timeout(2000);

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

});