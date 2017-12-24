let chai = require('chai');
let chaiSubset = require('chai-subset');
chai.use(chaiSubset);
let expect = chai.expect; // we are using the 'expect' style of Chai

let _ = require('lodash');
let RelationsCalculator = require('../../../../bazi_module/report/relations/relations-calculator');

describe('BaZi pillar HS relations calculator', function () {
    let calculator = RelationsCalculator("hs");

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

        let lookForStems = ['癸 A-', '壬 A+'];

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

        let lookForStems = ['乙 L-', '壬 A+'];

        let result = calculator.pillarsHave2StemRelation(inputChart, lookForStems);
        expect(result.length).to.equal(1);
        expect(result[0]).to.containSubset([
            {
                stem: '乙 L-',
                pillar: 'year'
            },
            {
                stem: '壬 A+',
                pillar: 'month'
            }
        ]);
    });

    it('check a list of 3 pillars has a 3-stem set', function () {
        let inputChart = {
            month: {
                hs: '壬 A+',
                eb: '午 wǔ'
            },
            day: {
                hs: '癸 A-',
                eb: '卯 mǎo'
            },
            hour: {
                hs: '乙 L-',
                eb: '丑 chǒu'
            }
        };

        let lookForStems = ['癸 A-', '壬 A+', '乙 L-'];

        let result = calculator.pillarsHave3StemRelation(inputChart, lookForStems);
        expect(result.length).to.equal(1);
        expect(result[0]).to.containSubset([
            {
                stem: '癸 A-',
                pillar: 'day'
            },
            {
                stem: '壬 A+',
                pillar: 'month'
            },
            {
                stem: '乙 L-',
                pillar: 'hour'
            }
        ]);
    });

    it('check 2 pillars has a 2-stem set', function () {
        let inputChart = {
            day: {
                hs: '癸 A-',
                eb: '卯 mǎo'
            },
            hour: {
                hs: '乙 L-',
                eb: '丑 chǒu'
            }
        };

        let lookForStems = ['癸 A-', '乙 L-'];

        let result = calculator.pillarsHave2StemRelation(inputChart, lookForStems);
        expect(result.length).to.equal(1);
        expect(result[0]).to.containSubset([
            {
                stem: '癸 A-',
                pillar: 'day'
            },
            {
                stem: '乙 L-',
                pillar: 'hour'
            }
        ]);
    });

    it('check a set of pillars must have the same number of relation elements', function () {
        let inputChart = {
            day: {
                hs: '癸 A-',
                eb: '卯 mǎo'
            },
            hour: {
                hs: '乙 L-',
                eb: '丑 chǒu'
            }
        };

        let lookForStems = ['癸 A-'];

        try {
            calculator.pillarsHaveStemRelation(inputChart, lookForStems);
            expect(result.length).to.equal(1);
        } catch (error) {
            expect(error.message).to.contain(
                "Pillars set should have the same number of elements as the relation");
        }
    });

    it('check a set of pillars has a 2-stem set with generic function', function () {
        let inputChart = {
            day: {
                hs: '癸 A-',
                eb: '卯 mǎo'
            },
            hour: {
                hs: '乙 L-',
                eb: '丑 chǒu'
            }
        };

        let lookForStems = ['癸 A-', '乙 L-'];

        let result = calculator.pillarsHaveStemRelation(inputChart, lookForStems);
        expect(result.length).to.equal(1);
        expect(result[0]).to.containSubset([
            {
                stem: '癸 A-',
                pillar: 'day'
            },
            {
                stem: '乙 L-',
                pillar: 'hour'
            }
        ]);
    });

    it('check a set of pillars has a 3-stem set with generic function', function () {
        let inputChart = {
            month: {
                hs: '壬 A+',
                eb: '午 wǔ'
            },
            day: {
                hs: '癸 A-',
                eb: '卯 mǎo'
            },
            hour: {
                hs: '乙 L-',
                eb: '丑 chǒu'
            }
        };

        let lookForStems = ['癸 A-', '壬 A+', '乙 L-'];

        let result = calculator.pillarsHave3StemRelation(inputChart, lookForStems);
        expect(result.length).to.equal(1);
        expect(result[0]).to.containSubset([
            {
                stem: '癸 A-',
                pillar: 'day'
            },
            {
                stem: '壬 A+',
                pillar: 'month'
            },
            {
                stem: '乙 L-',
                pillar: 'hour'
            }
        ]);
    });

    it('check a list of pillars has 2 overlapping stem pairs', function () {
        let inputChart = {
            year: {
                hs: '癸 A-',
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
                hs: '乙 L-',
                eb: '丑 chǒu'
            }
        };

        let lookForStems = ['癸 A-', '壬 A+'];

        let result = calculator.chartHasStemRelation(inputChart, lookForStems);
        expect(result.length).to.equal(2);
        expect(result[0]).to.containSubset([
            {
                stem: '癸 A-',
                pillar: 'year'
            },
            {
                stem: '壬 A+',
                pillar: 'month'
            }
        ], [
            {
                stem: '癸 A-',
                pillar: 'day'
            },
            {
                stem: '壬 A+',
                pillar: 'month'
            }]);
    });

    it('check a list of pillars has 2 adjacent stem pairs', function () {
        let inputChart = {
            year: {
                hs: '癸 A-',
                eb: '丑 chǒu'
            },
            month: {
                hs: '壬 A+',
                eb: '午 wǔ'
            },
            day: {
                hs: '壬 A+',
                eb: '卯 mǎo'
            },
            hour: {
                hs: '癸 A-',
                eb: '丑 chǒu'
            }
        };

        let lookForStems = ['癸 A-', '壬 A+'];

        let result = calculator.chartHasStemRelation(inputChart, lookForStems);
        expect(result.length).to.equal(2);
        expect(result[0]).to.containSubset([
            {
                stem: '癸 A-',
                pillar: 'year'
            },
            {
                stem: '壬 A+',
                pillar: 'month'
            }
        ], [
            {
                stem: '癸 A-',
                pillar: 'day'
            },
            {
                stem: '壬 A+',
                pillar: 'hour'
            }]);
    });

    it('check a list of pillars has 3 adjacent stem pairs', function () {
        let inputChart = {
            year: {
                hs: '癸 A-',
                eb: '丑 chǒu'
            },
            month: {
                hs: '壬 A+',
                eb: '午 wǔ'
            },
            day: {
                hs: '乙 L-',
                eb: '卯 mǎo'
            },
            hour: {
                hs: '癸 A-',
                eb: '丑 chǒu'
            }
        };

        let lookForStems = ['癸 A-', '壬 A+', '乙 L-'];

        let result = calculator.chartHasStemRelation(inputChart, lookForStems);
        expect(result.length).to.equal(2);
        expect(result[0]).to.containSubset([
            {
                stem: '癸 A-',
                pillar: 'year'
            },
            {
                stem: '壬 A+',
                pillar: 'month'
            },
            {
                stem: '乙 L-',
                pillar: 'day'
            }
        ]);
    });

    it('check a list of pillars has 2 overlapping sets of 3 adjacent stem pairs', function () {
        let inputChart = {
            year: {
                hs: '癸 A-',
                eb: '丑 chǒu'
            },
            month: {
                hs: '壬 A+',
                eb: '午 wǔ'
            },
            day: {
                hs: '乙 L-',
                eb: '卯 mǎo'
            },
            hour: {
                hs: '癸 A-',
                eb: '丑 chǒu'
            }
        };

        let lookForStems = ['癸 A-', '壬 A+', '乙 L-'];

        let result = calculator.chartHasStemRelation(inputChart, lookForStems);
        expect(result.length).to.equal(2);
        expect(result[0]).to.containSubset([
            {
                stem: '癸 A-',
                pillar: 'year'
            },
            {
                stem: '壬 A+',
                pillar: 'month'
            },
            {
                stem: '乙 L-',
                pillar: 'day'
            }
        ], [
            {
                stem: '癸 A-',
                pillar: 'hour'
            },
            {
                stem: '壬 A+',
                pillar: 'month'
            },
            {
                stem: '乙 L-',
                pillar: 'day'
            }
        ]);
    });

    it('check a chart has relation, but without extra pillar', function () {
        let inputChart = {
            year: {
                hs: '癸 A-',
                eb: '丑 chǒu'
            },
            month: {
                hs: '壬 A+',
                eb: '午 wǔ'
            },
            day: {
                hs: '乙 L-',
                eb: '卯 mǎo'
            },
            hour: {
                hs: '丁 F-',
                eb: '丑 chǒu'
            }
        };

        let pillar = {
            hs: '甲 L+',
            eb: '丑 chǒu'
        };

        let lookForStems = ['癸 A-', '壬 A+', '乙 L-'];

        let result = calculator.chartAndExternalPillarHasStemRelation(inputChart, pillar, lookForStems);
        expect(result.length).to.equal(0);
    });

    it('check a list of pillars has a 2-relation including an extra pillar', function () {
        let inputChart = {
            year: {
                hs: '癸 A-',
                eb: '丑 chǒu'
            },
            month: {
                hs: '壬 A+',
                eb: '午 wǔ'
            },
            day: {
                hs: '甲 L+', // ignored - only take the extra pillar L+
                eb: '卯 mǎo'
            },
            hour: {
                hs: '癸 A-',
                eb: '丑 chǒu'
            }
        };

        let pillar = {
            hs: '甲 L+',
            eb: '丑 chǒu',
            name: 'luck'
        };

        let lookForStems = ['壬 A+', '甲 L+'];

        let result = calculator.chartAndExternalPillarHasStemRelation(inputChart, pillar, lookForStems);
        expect(result.length).to.equal(1);
        expect(result[0]).to.containSubset([
            {
                stem: '壬 A+',
                pillar: 'month'
            },
            {
                stem: '甲 L+',
                pillar: 'luck'
            }
        ]);
    });

    it('check a list of pillars has a 3-relation including an extra pillar', function () {
        let inputChart = {
            year: {
                hs: '癸 A-',
                eb: '丑 chǒu'
            },
            month: {
                hs: '壬 A+',
                eb: '午 wǔ'
            },
            day: {
                hs: '甲 L+', // ignored - only take the extra pillar L+
                eb: '卯 mǎo'
            },
            hour: {
                hs: '癸 A-',
                eb: '丑 chǒu'
            }
        };

        let pillar = {
            hs: '甲 L+',
            eb: '丑 chǒu',
            name: 'luck'
        };

        let lookForStems = ['癸 A-', '壬 A+', '甲 L+'];

        let result = calculator.chartAndExternalPillarHasStemRelation(inputChart, pillar, lookForStems);
        expect(result.length).to.equal(1);
        expect(result[0]).to.containSubset([
            {
                stem: '癸 A-',
                pillar: 'year'
            },
            {
                stem: '壬 A+',
                pillar: 'month'
            },
            {
                stem: '甲 L+',
                pillar: 'luck'
            }
        ]);
    });

    it('check a chart has a 3-relation with another external chart', function () {
        let inputChart = {
            year: {
                hs: '癸 A-',
                eb: '丑 chǒu'
            },
            month: {
                hs: '壬 A+',
                eb: '午 wǔ'
            },
            day: {
                hs: '甲 L+', // ignored - only take the extra pillar L+
                eb: '卯 mǎo'
            },
            hour: {
                hs: '癸 A-',
                eb: '丑 chǒu'
            }
        };

        let externalChart = {
            year: {
                hs: '丙 F+',
                eb: '丑 chǒu'
            },
            month: {
                hs: '辛 M-',
                eb: '午 wǔ'
            },
            day: {
                hs: '甲 L+',
                eb: '卯 mǎo'
            },
            hour: {
                hs: '丙 F+',
                eb: '丑 chǒu'
            }
        };

        let lookForStems = ['癸 A-', '壬 A+', '甲 L+'];

        let result = calculator.chartHasRelationsWithExternalChart(inputChart, externalChart, lookForStems);
        expect(result.length).to.equal(1);
        expect(result[0]).to.containSubset([
            {
                stem: '癸 A-',
                pillar: 'year'
            },
            {
                stem: '壬 A+',
                pillar: 'month'
            },
            {
                stem: '甲 L+',
                pillar: 'external-day'
            }
        ]);
    });

    it('check a chart has a 2-relation with another external chart', function () {
        let inputChart = {
            year: {
                hs: '癸 A-',
                eb: '丑 chǒu'
            },
            month: {
                hs: '壬 A+',
                eb: '午 wǔ'
            },
            day: {
                hs: '甲 L+', // ignored - only take the extra pillar L+
                eb: '卯 mǎo'
            },
            hour: {
                hs: '癸 A-',
                eb: '丑 chǒu'
            }
        };

        let externalChart = {
            year: {
                hs: '丙 F+',
                eb: '丑 chǒu'
            },
            month: {
                hs: '辛 M-',
                eb: '午 wǔ'
            },
            day: {
                hs: '甲 L+',
                eb: '卯 mǎo'
            },
            hour: {
                hs: '丙 F+',
                eb: '丑 chǒu'
            }
        };

        let lookForStems = ['癸 A-', '甲 L+'];

        let result = calculator.chartHasRelationsWithExternalChart(inputChart, externalChart, lookForStems);
        expect(result.length).to.equal(2);
        expect(result[0]).to.containSubset([
            {
                stem: '癸 A-',
                pillar: 'year'
            },
            {
                stem: '甲 L+',
                pillar: 'external-day'
            }
        ], [
            {
                stem: '癸 A-',
                pillar: 'hour'
            },
            {
                stem: '甲 L+',
                pillar: 'external-day'
            }
        ]);
    });
});