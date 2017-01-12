var chai = require('chai');
var chaiSubset = require('chai-subset');
chai.use(chaiSubset);
var expect = chai.expect; // we are using the "expect" style of Chai

var Rules = require('./../../bazi_module/rules');

describe('BaZi rules tests', function () {
    it('Undefined options & undefined rule name', function () {
        var rules = Rules();
        expect(rules.includes()).to.equal(true);
    });

    it('Undefined options & defined rule name', function () {
        var rules = Rules();
        expect(rules.includes('something')).to.equal(true);
    });

    it('Defined options & defined rule name', function () {
        var rules = Rules({});
        expect(rules.includes('something')).to.equal(false);
    });

    it('Options with some rules that don\'t match', function () {
        var rules = Rules({
            test: true
        });
        expect(rules.includes('something')).to.equal(false);
    });

    it('Options with some rules that match', function () {
        var rules = Rules({
            test: true,
            something: true
        });
        expect(rules.includes('something')).to.equal(true);
    });

    it('Options with some rules that match but are false', function () {
        var rules = Rules({
            test: true,
            something: false
        });
        expect(rules.includes('something')).to.equal(false);
    });

    it('Options is integer = 1', function () {
        var rules = Rules(1);
        expect(rules.includes('dm')).to.equal(true);
        expect(rules.includes('current luck pillar')).to.equal(true);
    });

    it('Options is user level 3', function () {
        var rules = Rules(3);
        expect(rules.includes('gods strength for season')).to.equal(true);
        expect(rules.includes('normal life type')).to.equal(true);
        expect(rules.includes('gods strength')).to.equal(true);
        expect(rules.includes('branch relations')).to.equal(false);
    });

    it('Options is integer = 0', function () {
        var rules = Rules(0);
        expect(rules.includes('dm')).to.equal(false);
        expect(rules.includes('current luck pillar')).to.equal(false);
    });
});