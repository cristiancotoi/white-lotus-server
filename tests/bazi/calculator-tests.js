var chai = require('chai');
var chaiSubset = require('chai-subset');
chai.use(chaiSubset);
var expect = chai.expect; // we are using the "expect" style of Chai

var moment = require('moment');

var Calculator = require('./../../bazi_module/bazi-calculator');

describe('BaZi calculator calculation', function () {
    this.timeout(2000);

    it('calculate for 22 4 1984 22 50', function () {
        var date = {
            day: 22, month: 4, year: 1984, hour: 22, minute: 50,
            tz: 2, longitude: 28, sex: 'M'
        };

        var calculator = Calculator(date);
        var result = calculator.compute()
        //console.log(result);
        expect(result).to.containSubset({
            chart: {
                year: {hs: '甲 L+', eb: '子 zǐ', hidStems: ['癸 A-', '', '']},
                month: {
                    hs: '戊 P+',
                    eb: '辰 chén',
                    hidStems: ['戊 P+', '乙 L-', '癸 A-']
                },
                day: {hs: '丙 F+', eb: '戌 xū', hidStems: ['戊 P+', '辛 M-', '丁 F-']},
                hour: {hs: '己 P-', eb: '亥 hài', hidStems: ['壬 A+', '甲 L+', '']}
            },
            comment1: '',
            comment2: '',
            'an start': 4.03,
            fw: 1
        });
    });

    it('calculate for 27 1 1985 23 55', function () {
        var date = {
            day: 27, month: 1, year: 1985, hour: 23, minute: 50,
            tz: 2, longitude: 28, sex: 'F'
        };

        var calculator = Calculator(date);
        var result = calculator.compute()
        //console.log(result);
        expect(result).to.containSubset({
            chart: {
                year: {hs: '甲 L+', eb: '子 zǐ', hidStems: ['癸 A-', '', '']},
                month: {
                    hs: '丁 F-',
                    eb: '丑 chǒu',
                    hidStems: ['己 P-', '癸 A-', '辛 M-']
                },
                day: {hs: '丙 F+', eb: '寅 yín', hidStems: ['甲 L+', '丙 F+', '戊 P+']},
                hour: {hs: '庚 M+', eb: '子 zǐ', hidStems: ['癸 A-', '', '']}
            },
            comment1: '',
            comment2: '',
            'an start': 7.64,
            fw: -1
        });
    });

    it('calculate for 24 12 1948 1 20', function () {
        var date = {
            day: 24, month: 12, year: 1948, hour: 1, minute: 20,
            tz: 2, longitude: 28, sex: 'F'
        };

        var calculator = Calculator(date);
        var result = calculator.compute()
        //console.log(result);
        expect(result).to.containSubset({
            chart: {
                year: {hs: '戊 P+', eb: '子 zǐ', hidStems: ['癸 A-', '', '']},
                month: {hs: '甲 L+', eb: '子 zǐ', hidStems: ['癸 A-', '', '']},
                day: {hs: '癸 A-', eb: '未 wèi', hidStems: ['己 P-', '丁 F-', '乙 L-']},
                hour: {
                    hs: '癸 A-',
                    eb: '丑 chǒu',
                    hidStems: ['己 P-', '癸 A-', '辛 M-']
                }
            },
            comment1: '',
            comment2: '',
            'an start': 5.69,
            fw: -1
        });
    });

    it('calculate for 24 1 2004 3 40', function () {
        var date = {
            day: 24, month: 1, year: 2004, hour: 3, minute: 40,
            tz: 2, longitude: 28, sex: 'F'
        };

        var calculator = Calculator(date);
        var result = calculator.compute()
        //console.log(result);
        expect(result).to.containSubset({
            chart: {
                year: {hs: '癸 A-', eb: '未 wèi', hidStems: ['己 P-', '丁 F-', '乙 L-']},
                month: {
                    hs: '乙 L-',
                    eb: '丑 chǒu',
                    hidStems: ['己 P-', '癸 A-', '辛 M-']
                },
                day: {hs: '壬 A+', eb: '寅 yín', hidStems: ['甲 L+', '丙 F+', '戊 P+']},
                hour: {hs: '壬 A+', eb: '寅 yín', hidStems: ['甲 L+', '丙 F+', '戊 P+']}
            },
            comment1: '',
            comment2: '',
            'an start': 3.86,
            fw: 1
        });
    });

});