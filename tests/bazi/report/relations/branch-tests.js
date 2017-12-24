let chai = require('chai');
let chaiSubset = require('chai-subset');
chai.use(chaiSubset);
let expect = chai.expect; // we are using the 'expect' style of Chai

let _ = require('lodash');
let BranchRelationsCalculator = require('../../../../bazi_module/report/relations/branch');

describe('BaZi branch relations calculator', function () {
    let calculator = BranchRelationsCalculator();

    it('check branch present in chart', function () {
        let input = {
            year: {
                eb: '丑 chǒu'
            },
            month: {
                eb: '午 wǔ'
            },
            day: {
                eb: '卯 mǎo'
            },
            hour: {
                eb: '丑 chǒu'
            }
        };

        let result = calculator.chartHasBranch(input, '卯 mǎo');
        expect(result[0]).to.containSubset([{
            branch: '卯 mǎo',
            pillar: 'day'
        }]);
    });

    it('check branch present in chart in 3 places', function () {
        let input = {
            year: {
                eb: '卯 mǎo'
            },
            month: {
                eb: '卯 mǎo'
            },
            day: {
                eb: '卯 mǎo'
            },
            hour: {
                eb: '丑 chǒu'
            }
        };

        let result = calculator.chartHasBranch(input, '卯 mǎo');
        expect(result).to.containSubset([
            [{
                branch: '卯 mǎo',
                pillar: 'day'
            }],
            [{
                branch: '卯 mǎo',
                pillar: 'month'
            }],
            [{
                branch: '卯 mǎo',
                pillar: 'year'
            }]]);
    });

    it('check 2 adjacent branches in chart', function () {
        let input = {
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


        let result = calculator.chartHas2AdjacentBranches(input, '卯 mǎo', '丑 chǒu');
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

    it('check 2 identical branches adjacent in chart', function () {
        let input = {
            year: {
                hs: '乙 L-',
                eb: '午 wǔ'
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

        let result = calculator.chartHas2AdjacentBranches(input, '午 wǔ', '午 wǔ');
        expect(result.length).to.equal(1);
        expect(result[0]).to.containSubset([
            {
                branch: '午 wǔ',
                pillar: 'year'
            },
            {
                branch: '午 wǔ',
                pillar: 'month'
            }
        ]);
    });

    it('check 2 not adjacent branches in chart', function () {
        let input = {
            year: {
                eb: '未 wèi'
            },
            month: {
                eb: '午 wǔ'
            },
            day: {
                eb: '卯 mǎo'
            },
            hour: {
                eb: '丑 chǒu'
            }
        };

        let result = calculator.chartHas2AdjacentBranches(input, '午 wǔ', '丑 chǒu');
        expect(result.length).to.equal(0);
    });

    it('check 3 pairs of branches', function () {
        let input = {
            year: {
                eb: '午 wǔ'
            },
            month: {
                eb: '午 wǔ'
            },
            day: {
                eb: '午 wǔ'
            },
            hour: {
                eb: '午 wǔ'
            }
        };

        let result = calculator.chartHas2AdjacentBranches(input, '午 wǔ', '午 wǔ');
        expect(result.length).to.equal(3);
    });

    it('check adjacent branches in chart with 2 pairs', function () {
        let input = {
            year: {
                eb: '丑 chǒu'
            },
            month: {
                eb: '丑 chǒu'
            },
            day: {
                eb: '卯 mǎo'
            },
            hour: {
                eb: '丑 chǒu'
            }
        };

        let result = calculator.chartHas2AdjacentBranches(input, '卯 mǎo', '丑 chǒu');
        expect(result.length).to.equal(2);
        expect(result).to.containSubset([
            [
                {
                    pillar: 'day', branch: '卯 mǎo'
                },
                {
                    pillar: 'hour', branch: '丑 chǒu'
                }
            ],
            [
                {
                    pillar: 'day', branch: '卯 mǎo'
                },
                {
                    pillar: 'month', branch: '丑 chǒu'
                }
            ]
        ]);
    });

    it('check 3 adjacent branches in chart', function () {
        let input = {
            year: {
                eb: '午 wǔ'
            },
            month: {
                eb: '午 wǔ'
            },
            day: {
                eb: '卯 mǎo'
            },
            hour: {
                eb: '丑 chǒu'
            }
        };

        let result = calculator.chartHas3AdjacentBranches(input, '卯 mǎo', '丑 chǒu', '午 wǔ');
        expect(result.length).to.equal(1);
        expect(result[0]).to.deep.have.members([
            {
                branch: '丑 chǒu',
                pillar: 'hour'
            },
            {
                branch: '卯 mǎo',
                pillar: 'day'
            },
            {
                branch: '午 wǔ',
                pillar: 'month'
            }
        ]);
    });

    it('check 3 adjacent branches in chart with that appear twice', function () {
        let input = {
            year: {
                eb: '丑 chǒu'
            },
            month: {
                eb: '午 wǔ'
            },
            day: {
                eb: '卯 mǎo'
            },
            hour: {
                eb: '丑 chǒu'
            }
        };

        let result = calculator.chartHas3AdjacentBranches(input, '卯 mǎo', '丑 chǒu', '午 wǔ');
        expect(result.length).to.equal(2);
        expect(result).to.containSubset([
            [
                {pillar: 'hour', branch: '丑 chǒu'},
                {pillar: 'day', branch: '卯 mǎo'},
                {pillar: 'month', branch: '午 wǔ'}
            ],
            [
                {pillar: 'year', branch: '丑 chǒu'},
                {pillar: 'day', branch: '卯 mǎo'},
                {pillar: 'month', branch: '午 wǔ'}
            ]
        ]);
    });

    it('check general matching relations', function () {
        let input = {
            year: {
                eb: '丑 chǒu'
            },
            month: {
                eb: '午 wǔ'
            },
            day: {
                eb: '卯 mǎo'
            },
            hour: {
                eb: '丑 chǒu'
            }
        };

        let relations = [
            {eb1: '午 wǔ'}, // hit
            {eb1: '卯 mǎo'}, // hit
            {eb1: '丑 chǒu', eb2: '午 wǔ'}, //hit
            {eb1: '未 wèi', eb2: '午 wǔ'},
            {eb1: '未 wèi', eb2: '午 wǔ', eb3: '午 wǔ'},
            {eb1: '丑 chǒu', eb2: '午 wǔ', eb3: '卯 mǎo'}, // hit
            {eb1: '丑 chǒu', eb2: '午 wǔ', eb3: '丑 chǒu'}
        ];
        let result = calculator.getMatchingRelationsInChart(input, relations);
        expect(result.length).to.equal(4);
        expect(result).to.containSubset([
            {
                relation: {eb1: '午 wǔ'}, matchingPillars: [
                [{
                    branch: '午 wǔ',
                    pillar: 'month'
                }]]
            },
            {
                relation: {eb1: '卯 mǎo'}, matchingPillars: [
                [{
                    branch: '卯 mǎo',
                    pillar: 'day'
                }]]
            },
            {
                relation: {eb1: '丑 chǒu', eb2: '午 wǔ'},
                matchingPillars: [
                    [{
                        branch: '丑 chǒu',
                        pillar: 'year'
                    },
                        {
                            branch: '午 wǔ',
                            pillar: 'month'
                        }]]
            },
            {
                relation: {eb1: '丑 chǒu', eb2: '午 wǔ', eb3: '卯 mǎo'},
                matchingPillars: [
                    [
                        {
                            branch: '丑 chǒu',
                            pillar: 'hour'
                        },
                        {
                            branch: '卯 mǎo',
                            pillar: 'day'
                        },
                        {
                            branch: '午 wǔ',
                            pillar: 'month'
                        }
                    ],
                    [
                        {
                            branch: '丑 chǒu',
                            pillar: 'year'
                        },
                        {
                            branch: '卯 mǎo',
                            pillar: 'day'
                        },
                        {
                            branch: '午 wǔ',
                            pillar: 'month'
                        }
                    ]]
            }
        ]);
    });

});