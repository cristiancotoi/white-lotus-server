var chai = require('chai');
var expect = chai.expect; // we are using the "expect" style of Chai

var connectToDb = require('./../../utils/db-utils');

var pSquare = require('./../../psquare_module/main');

describe('Pythagorean Square basic calculations', function () {
    this.timeout(2000);
    before(function () {
        connectToDb();
    });

    it('check basic calculations', function (done) {
        var date = {
            day: 23, month: 4, year: 1984
        };

        function asserts(result) {
            expect(result.op[0].number).to.equal(31);
            expect(result.op[1].number).to.equal(4);
            expect(result.op[2].number).to.equal(27);
            expect(result.op[3].number).to.equal(9);
            expect(result.square).to.have.members(['', '11', '22', '33', '444', '', '', '7', '8', '99']);
            expect(result.spiritLevel.level).to.equal(3);
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