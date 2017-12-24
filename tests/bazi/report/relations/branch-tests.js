let chai = require('chai');
let chaiSubset = require('chai-subset');
chai.use(chaiSubset);
let expect = chai.expect; // we are using the 'expect' style of Chai

let _ = require('lodash');
let BranchRelationsCalculator = require('../../../../bazi_module/report/relations/branch');

describe('BaZi branch relations calculator', function () {
    let calculator = BranchRelationsCalculator("eb");

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
            {eb1: '午 wǔ'},
            {eb1: '卯 mǎo'},
            {eb1: '丑 chǒu', eb2: '午 wǔ'}, //hit
            {eb1: '未 wèi', eb2: '午 wǔ'},
            {eb1: '未 wèi', eb2: '午 wǔ', eb3: '午 wǔ'},
            {eb1: '丑 chǒu', eb2: '午 wǔ', eb3: '卯 mǎo'}, // hit
            {eb1: '丑 chǒu', eb2: '午 wǔ', eb3: '丑 chǒu'}
        ];
        let result = calculator.getMatchingRelationsInChart(input, relations);
        expect(result.length).to.equal(2);
        expect(result).to.containSubset([
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