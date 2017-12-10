let chai = require('chai');
let chaiSubset = require('chai-subset');
chai.use(chaiSubset);
let expect = chai.expect; // we are using the 'expect' style of Chai

let _ = require('lodash');
let GodsCalculator = require('../../../../bazi_module/report/relations/branch');

describe('BaZi utils age calculation', function () {
    let calculator = GodsCalculator();

    it('check 2 adjacent branches in chart', function () {
        let inputChart = {
            year: {
                hs: '乙 L-',
                eb: '丑 chǒu'
            },
            month: {
                hs: '壬 A+',
                eb: '午 wǔ'
            },
            day: {
                hs: '癸 A-',
                eb: '卯 mǎo'
            },
            hour: {
                hs: '癸 A-',
                eb: '丑 chǒu'
            }
        };

        let extPillar = {
            hs: '癸 A-',
            eb: '丑 chǒu'
        };

        let result = calculator.chartHas2AdjacentBranches(inputChart, '卯 mǎo', '丑 chǒu');
        expect(result.length).to.equal(1);
        expect(result[0]).to.containSubset([
            {
                branch: '卯 mǎo',
                pillar: 'day'
            },
            {
                branch: '丑 chǒu',
                pillar: 'hour'
            }
        ]);
    });
});