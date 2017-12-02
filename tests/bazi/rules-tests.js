let chai = require('chai');
let chaiSubset = require('chai-subset');
chai.use(chaiSubset);
let expect = chai.expect; // we are using the "expect" style of Chai

let Rules = require('../../bazi_module/report/rules');

describe('BaZi rules tests', function () {
    it('Undefined options & undefined rule name', function () {
        let rules = Rules();
        expect(rules.includes()).to.equal(true);
    });

    it('Undefined options & defined rule name', function () {
        let rules = Rules();
        expect(rules.includes('something')).to.equal(true);
    });

    it('Defined options & defined rule name', function () {
        let rules = Rules({});
        expect(rules.includes('something')).to.equal(false);
    });

    it('Options with some rules that don\'t match', function () {
        let rules = Rules({
            test: true
        });
        expect(rules.includes('something')).to.equal(false);
    });

    it('Options with some rules that match', function () {
        let rules = Rules({
            test: true,
            something: true
        });
        expect(rules.includes('something')).to.equal(true);
    });

    it('Options with some rules that match but are false', function () {
        let rules = Rules({
            test: true,
            something: false
        });
        expect(rules.includes('something')).to.equal(false);
    });

    it('Options is integer = 1', function () {
        let rules = Rules({level: 1});
        expect(rules.includes('dm')).to.equal(false);
        expect(rules.includes('current luck pillar')).to.equal(true);
    });

    it('Level 99 includes dm', function () {
        let rules = Rules({level: 99});
        expect(rules.includes('dm')).to.equal(true);
    });

    it('Options is user level 3', function () {
        let rules = Rules({level: 3});
        expect(rules.includes('gods strength for season')).to.equal(true);
        expect(rules.includes('normal life type')).to.equal(true);
        expect(rules.includes('gods strength')).to.equal(true);
        expect(rules.includes('branch relations')).to.equal(false);
    });

    it('Options is integer = 0', function () {
        let rules = Rules({level: 0});
        expect(rules.includes('dm')).to.equal(false);
        expect(rules.includes('current luck pillar')).to.equal(false);
    });

    it('Options level append to existing ones', function () {
        let rules = Rules({
            level: 3,
            'branch relations': true
        });
        expect(rules.includes('gods strength for season')).to.equal(true);
        expect(rules.includes('normal life type')).to.equal(true);
        expect(rules.includes('gods strength')).to.equal(true);
        expect(rules.includes('branch relations')).to.equal(true);
    });

});