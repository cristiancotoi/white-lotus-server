let chai = require('chai');
let chaiSubset = require('chai-subset');
chai.use(chaiSubset);
let expect = chai.expect; // we are using the 'expect' style of Chai

let _ = require('lodash');
let StemsRelationsCalculator = require('../../../../bazi_module/report/relations/stems');

describe('BaZi stem relations calculator', function () {
    let calculator = StemsRelationsCalculator();

    it('check general matching relations', function () {
        let input = {
            year: {
                hs: '癸 A-',
                eb: '丑 chǒu'
            },
            month: {
                hs: '壬 A+',
                eb: '午 wǔ'
            },
            day: {
                hs: '丙 F+',
                eb: '卯 mǎo'
            },
            hour: {
                hs: '癸 A-',
                eb: '丑 chǒu'
            }
        };

        let relations = [
            {hs1: '丙 F+', hs2: '壬 A+'}, //hit
            {hs1: '戊 P+', hs2: '壬 A+'},
            {hs1: '乙 L-', hs2: '壬 A+', hs3: '戊 P+'},
            {hs1: '丙 F+', hs2: '壬 A+', hs3: '癸 A-'}, // hit
            {hs1: '丙 F+', hs2: '壬 A+', hs3: '戊 P+'}
        ];
        let result = calculator.getMatchingRelationsInChart(input, relations);
        // expect(result.length).to.equal(2);
        expect(result).to.containSubset([
            {
                relation: {hs1: '丙 F+', hs2: '壬 A+'},
                matchingPillars: [
                    [{
                        "pillar": "month",
                        "stem": "壬 A+"
                    }, {
                        "pillar": "day",
                        "stem": "丙 F+"
                    }]]
            },
            {
                relation: {hs1: '丙 F+', hs2: '壬 A+', hs3: '癸 A-'},
                matchingPillars: [[
                    {
                        pillar: "year",
                        stem: "癸 A-"
                    }, {
                        pillar: "month",
                        stem: "壬 A+"
                    }, {
                        pillar: "day",
                        stem: "丙 F+"
                    }
                ], [
                    {
                        pillar: "month",
                        stem: "壬 A+"
                    }, {
                        pillar: "day",
                        stem: "丙 F+"
                    }, {
                        pillar: "hour",
                        stem: "癸 A-"
                    }
                ]
                ]
            }]);
    });

});