var chai = require('chai');
var expect = chai.expect; // we are using the "expect" style of Chai
var pSquare = require('./../../psquare_module/main');

describe('Pythagorean Square basic calculations', function () {
    it('check op numbers', function () {
        var date = {
            day: 23, month: 4, year: 1984
        };
        var result = pSquare(date);
        expect(result.op).to.have.members([31, 4, 27, 9]);
    });

    it('check digit strings', function () {
        var date = {
            day: 23, month: 4, year: 1984
        };
        var result = pSquare(date);
        expect(result.square).to.have.members(['', '11', '22', '33', '444', '','', '7', '8', '99']);
    });
});