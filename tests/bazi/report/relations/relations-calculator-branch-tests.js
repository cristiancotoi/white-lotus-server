let chai = require('chai');
let chaiSubset = require('chai-subset');
chai.use(chaiSubset);
let expect = chai.expect; // we are using the 'expect' style of Chai

let _ = require('lodash');
let RelationsCalculator = require('../../../../bazi_module/report/relations/relations-calculator');

describe('BaZi pillar EB relations calculator', function () {
    let calculator = RelationsCalculator("eb");

    it('check a 2 pillars DON\'T have a stem pair', function () {
        let inputChart = {
            year: {
                hs: '乙 L-',
                eb: '丑 chǒu'
            },
            month: {
                hs: '壬 A+',
                eb: '午 wǔ'
            }
        };

        let lookForStems = ['卯 mǎo', '午 wǔ'];

        let result = calculator.pillarsHave2StemRelation(inputChart, lookForStems);
        expect(result.length).to.equal(0);
    });

    it('check a 2 pillars have a stem pair', function () {
        let inputChart = {
            year: {
                hs: '乙 L-',
                eb: '丑 chǒu'
            },
            month: {
                hs: '壬 A+',
                eb: '午 wǔ'
            }
        };

        let lookForStems = ['丑 chǒu', '午 wǔ'];

        let result = calculator.pillarsHave2StemRelation(inputChart, lookForStems);
        expect(result.length).to.equal(1);
        expect(result[0]).to.containSubset([
            {
                branch: '丑 chǒu',
                pillar: 'year'
            },
            {
                branch: '午 wǔ',
                pillar: 'month'
            }
        ]);
    });

});