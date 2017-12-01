let chai = require('chai');
let chaiSubset = require('chai-subset');
chai.use(chaiSubset);
let expect = chai.expect; // we are using the "expect" style of Chai

let _ = require('lodash');

let connectToDb = require('../../utils/db-utils');

let pSquare = require('../../psquare_module/main');

describe('Data retriever tests', function () {
    this.timeout(2000);
    before(function () {
        connectToDb();
    });

    it('Data retrieving for max level', function (done) {
        let date = {
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

            expect(result['sq combos'].length).to.equal(5);
            expect(_.size(result.lines)).to.equal(8);
            expect(_.size(result.linesWeight)).to.equal(8);
            expect(result.sqMeaning.length).to.equal(10);
            done();
        }

        pSquare({date: date}, {json: asserts}).make(99);
    });
});