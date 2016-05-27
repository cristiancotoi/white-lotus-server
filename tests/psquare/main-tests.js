var chai = require('chai');
var chaiSubset = require('chai-subset');
chai.use(chaiSubset);
var expect = chai.expect; // we are using the "expect" style of Chai

var connectToDb = require('./../../utils/db-utils');

var pSquare = require('./../../psquare_module/main');

describe('Pythagorean Square basic calculations', function () {
    this.timeout(2000);
    before(function () {
        connectToDb();
    });

    it('check basic calculations for 23/4/1984', function (done) {
        var date = {
            day: 23, month: 4, year: 1984
        };

        function asserts(result) {
            expect(result).to.containSubset({
                op:[
                    {number: 31},
                    {number: 4},
                    {number: 27},
                    {number: 9}
                ]
            });
            expect(result.square).to.have.members(['', '11', '22', '33', '444', '', '', '7', '8', '99']);
            expect(result.spiritLevel.level).to.equal(3);
            expect(result.destiny.number).to.equal(4);

            expect(result['sq combos'].length).to.equal(6);
            expect(result.sqMeaning.length).to.equal(10);
            done();
        }

        pSquare({date: date}, {json: asserts});
    });

    it('check vibrations for 23/4/1984', function (done) {
        var date = {
            day: 23, month: 4, year: 1984
        };

        function asserts(result) {
            expect(result['interior vibration'].number).to.equal(5);
            expect(result['interior vibration'].planet).to.equal('Mercur');
            expect(result['interior vibration'].qualities).to.contain('spiritual');

            expect(result['exterior vibration'].number).to.equal(4);
            done();
        }

        pSquare({date: date}, {json: asserts});
    });

    it('check basic calculations for 28/1/1985', function (done) {
        var date = {
            day: 28, month: 1, year: 1985
        };

        function asserts(result) {
            expect(result).to.containSubset({
                op:[
                    {number: 34},
                    {number: 7},
                    {number: 30},
                    {number: 3}
                ]
            });
            expect(result.square).to.have.members(['0', '11', '2', '333', '4', '5', '', '7', '88', '9']);
            expect(result.spiritLevel.level).to.equal(3);
            expect(result.destiny.number).to.equal(7);
            done();
        }

        pSquare({date: date}, {json: asserts});
    });

    it('check vibrations for 28/1/1985', function (done) {
        var date = {
            day: 28, month: 1, year: 1985
        };

        function asserts(result) {
            expect(result['interior vibration'].number).to.equal(1);
            expect(result['interior vibration'].planet).to.equal('Soare');
            expect(result['interior vibration'].qualities).to.contain('disciplinat');

            expect(result['exterior vibration'].number).to.equal(1);
            done();
        }

        pSquare({date: date}, {json: asserts});
    });

    it('check op positions', function (done) {
        var date = {
            day: 23, month: 4, year: 1984
        };

        function asserts(result) {
            expect(result.op[0].position).to.equal(1);
            expect(result.op[1].position).to.equal(2);
            expect(result.op[2].position).to.equal(3);
            expect(result.op[3].position).to.equal(4);
            done();
        }

        pSquare({date: date}, {json: asserts});
    });
});