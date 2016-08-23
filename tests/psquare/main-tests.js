var chai = require('chai');
var chaiSubset = require('chai-subset');
chai.use(chaiSubset);
var expect = chai.expect; // we are using the "expect" style of Chai

var _ = require('underscore');
var moment = require('moment');

var connectToDb = require('./../../utils/db-utils');

var pSquare = require('./../../psquare_module/main');

describe('Pythagorean Square basic calculations', function () {
    this.timeout(2000);
    before(function () {
        connectToDb();
    });

    it('check invalid initialization with undefined', function (done) {
        try {
            pSquare(undefined);
            expect(true).to.equal('Did not throw any exception!');
        } catch (ex) {
            expect(ex).to.equal('Invalid person');
            done();
        }
    });

    it('check invalid initialization with null', function (done) {
        try {
            pSquare(null);
            expect(true).to.equal('Did not throw any exception!');
        } catch (ex) {
            expect(ex).to.equal('Invalid person');
            done();
        }
    });

    it('check basic calculations for 23/4/1984', function (done) {
        var date = {
            day: 23, month: 4, year: 1984
        };

        function asserts(result) {
            expect(result).to.containSubset({
                op: [
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

            expect(result.lifeCycle['1'].number).to.equal(4);
            expect(result.lifeCycle['2'].number).to.equal(5);
            expect(result.lifeCycle['3'].number).to.equal(4);
            expect(result.lifeCycle).to.containSubset({
                '1': {min: 0, max: 31, number: 4},
                '2': {min: 32, max: 58, number: 5},
                '3': {min: 59, max: 999, number: 4}
            });
            expect(_.size(result.lifeCycleDesc)).to.equal(2);
            done();
        }

        pSquare({date: date}, {json: asserts}).make(99);
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

        pSquare({date: date}, {json: asserts}).make(3);
    });

    it('check basic calculations for 28/1/1985', function (done) {
        var date = {
            day: 28, month: 1, year: 1985
        };

        function asserts(result) {
            expect(result).to.containSubset({
                op: [
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

        pSquare({date: date}, {json: asserts}).make(1);
    });

    it('check basic calculations for 4/1/2000', function (done) {
        var date = {
            day: 4, month: 1, year: 2000
        };

        function asserts(result) {
            expect(result).to.containSubset({
                op: [
                    {number: 7},
                    {number: 7},
                    {number: 1},
                    {number: 1}
                ]
            });
            expect(result.square).to.have.members(['000', '111', '2', '', '4', '', '', '77', '', '']);
            expect(result.destiny.number).to.equal(7);
            expect(result.spiritLevel).to.equal(undefined);
            done();
        }

        pSquare({date: date}, {json: asserts}).make(1);
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

        pSquare({date: date}, {json: asserts}).make(3);
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

        pSquare({date: date}, {json: asserts}).make(1);
    });

    it('check life cycles for date without hour', function (done) {
        var date = {
            day: 21, month: 9, year: 2015
        };

        function asserts(result) {
            expect(result.lifeCycle['1'].start).to.equal('21-09-2015');
            expect(result.lifeCycle['1'].end).to.equal('21-09-2048');
            done();
        }

        pSquare({date: date}, {json: asserts}).make(99);
    });

    it('check life cycles for date with hour', function (done) {
        var date = {
            day: 5, month: 1, year: 1956,
            hour: 5, minutes: 30
        };

        function asserts(result) {
            expect(result.lifeCycle['1'].start).to.equal('05-01-1956');
            expect(result.lifeCycle['1'].end).to.equal('05-01-1982');
            done();
        }

        pSquare({date: date}, {json: asserts}).make(99);
    });

    /**
     * This date produces a negative OP3.
     */
    it('check 2011 10 8', function (done) {
        var date = {
            day: 8, month: 10, year: 2011
        };

        function asserts(result) {
            expect(result.op[0].number).to.equal(13);
            expect(result.op[1].number).to.equal(4);
            expect(result.op[2].number).to.equal(3);
            expect(result.op[3].number).to.equal(3);
            done();
        }

        pSquare({date: date}, {json: asserts}).make(1);
    });

    xit('check series', function (done) {
        var timeout = 30000;
        this.timeout(timeout);
        var m = moment();
        for (var i = 0; i < 1000; i++) {
            var date = {
                day: m.date(), month: m.month() + 1, year: m.year()
            };

            function asserts(result) {
                var date = result.date;
                var dateString = date.month + '/' + date.day + '/' + date.year;
                var dayId = dateString + ' = ' +
                    result.destiny.number + ' = ' +
                    result['interior vibration'].number + ' = ' +
                    result['exterior vibration'].number + ' = ' +
                    result['cosmic vibration'].number;
                console.log(dayId);
            }

            pSquare({date: date}, {json: asserts}).make(99);
            m = m.add(1, 'day');
        }
        setTimeout(done, timeout - 3000);
    });
});