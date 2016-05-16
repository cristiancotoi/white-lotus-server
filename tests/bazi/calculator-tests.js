var chai = require('chai');
var chaiSubset = require('chai-subset');
chai.use(chaiSubset);
var expect = chai.expect; // we are using the "expect" style of Chai

var BaZiCalculator = require('./../../bazi_module/bazi-calculator');

describe('BaZi calculator calculation', function () {
    this.timeout(2000);

    it('calculate for 22 4 1984 22 50', function () {
        var person = {
            date: {
                day: 22, month: 4, year: 1984, hour: 22, minute: 50
            },
            tz: 2, longitude: 28, gender: 'M'
        };

        var calculator = BaZiCalculator(person);
        var result = calculator.compute();
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
        var person = {
            date: {
                day: 27, month: 1, year: 1985, hour: 23, minute: 50
            },
            tz: 2, longitude: 28, gender: 'F'
        };

        var calculator = BaZiCalculator(person);
        var result = calculator.compute();
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
        var person = {
            date: {
                day: 24, month: 12, year: 1948, hour: 1, minute: 20
            },
            tz: 2, longitude: 28, gender: 'F'
        };

        var calculator = BaZiCalculator(person);
        var result = calculator.compute();
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
            luck: [{hs: '癸 A-', eb: '亥 hài'},
                {hs: '壬 A+', eb: '戌 xū'},
                {hs: '辛 M-', eb: '酉 yǒu'},
                {hs: '庚 M+', eb: '申 shēn'},
                {hs: '己 P-', eb: '未 wèi'},
                {hs: '戊 P+', eb: '午 wǔ'},
                {hs: '丁 F-', eb: '巳 sì'},
                {hs: '丙 F+', eb: '辰 chén'},
                {hs: '乙 L-', eb: '卯 mǎo'}],
            fw: -1
        });
    });

    it('calculate for 24 1 2004 3 40', function () {
        var person = {
            date: {
                day: 24, month: 1, year: 2004, hour: 3, minute: 40
            },
            tz: 2, longitude: 28, gender: 'F'
        };

        var calculator = BaZiCalculator(person);
        var result = calculator.compute();
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
            luck: [{hs: '丙 F+', eb: '寅 yín'},
                {hs: '丁 F-', eb: '卯 mǎo'},
                {hs: '戊 P+', eb: '辰 chén'},
                {hs: '己 P-', eb: '巳 sì'},
                {hs: '庚 M+', eb: '午 wǔ'},
                {hs: '辛 M-', eb: '未 wèi'},
                {hs: '壬 A+', eb: '申 shēn'},
                {hs: '癸 A-', eb: '酉 yǒu'},
                {hs: '甲 L+', eb: '戌 xū'}], fw: 1
        });
    });

    it('calculate for 1 4 1980 23:18', function () {
        var person = {
            date: {
                day: 1, month: 4, year: 1980, hour: 23, minute: 18
            },
            tz: 2, longitude: 28, gender: 'M'
        };

        var calculator = BaZiCalculator(person);
        var result = calculator.compute();
        expect(result).to.containSubset({
            chart: {
                year: {hs: '庚 M+', eb: '申 shēn', hidStems: ['庚 M+', '壬 A+', '戊 P+']},
                month: {hs: '己 P-', eb: '卯 mǎo', hidStems: ['乙 L-', '', '']},
                day: {hs: '甲 L+', eb: '辰 chén', hidStems: ['戊 P+', '乙 L-', '癸 A-']},
                hour: {hs: '丙 F+', eb: '子 zǐ', hidStems: ['癸 A-', '', '']}
            },
            comment1: '',
            comment2: '',
            'an start': 0.9,
            luck: [{hs: '庚 M+', eb: '辰 chén'},
                {hs: '辛 M-', eb: '巳 sì'},
                {hs: '壬 A+', eb: '午 wǔ'},
                {hs: '癸 A-', eb: '未 wèi'},
                {hs: '甲 L+', eb: '申 shēn'},
                {hs: '乙 L-', eb: '酉 yǒu'},
                {hs: '丙 F+', eb: '戌 xū'},
                {hs: '丁 F-', eb: '亥 hài'},
                {hs: '戊 P+', eb: '子 zǐ'}],
            fw: 1
        });
    });

    it('calculate for 7 6 1955 17:30', function () {
        var person = {
            date: {
                day: 7, month: 6, year: 1955, hour: 17, minute: 30
            },
            tz: 2, longitude: 28, gender: 'M'
        };

        var calculator = BaZiCalculator(person);
        var result = calculator.compute();
        //console.log(result);
        expect(result).to.containSubset({
            chart: {
                year: {hs: '乙 L-', eb: '未 wèi', hidStems: ['己 P-', '丁 F-', '乙 L-']},
                month: {hs: '壬 A+', eb: '午 wǔ', hidStems: ['丁 F-', '己 P-', '']},
                day: {hs: '己 P-', eb: '亥 hài', hidStems: ['壬 A+', '甲 L+', '']},
                hour: {hs: '癸 A-', eb: '酉 yǒu', hidStems: ['辛 M-', '', '']}
            },
            comment1: '',
            comment2: '',
            'an start': 0.36,
            luck: [{hs: '辛 M-', eb: '巳 sì'},
                {hs: '庚 M+', eb: '辰 chén'},
                {hs: '己 P-', eb: '卯 mǎo'},
                {hs: '戊 P+', eb: '寅 yín'},
                {hs: '丁 F-', eb: '丑 chǒu'},
                {hs: '丙 F+', eb: '子 zǐ'},
                {hs: '乙 L-', eb: '亥 hài'},
                {hs: '甲 L+', eb: '戌 xū'},
                {hs: '癸 A-', eb: '酉 yǒu'}],
            fw: -1
        });
    });

    it('calculate for 7 6 1955 17:30 (prod data)', function () {
        var person = {
            date: {minutes: 30, hour: 17, year: 1955, month: 6, day: 7},
            __v: 0,
            analystId: 'cristian.cotoi@gmail.com',
            gender: 'M',
            longitude: 28,
            tz: 2,
            surname: 'Aurel',
            name: 'Cotoi',
            _id: '5713659d6f1d54a01e356e24'
        };

        var calculator = BaZiCalculator(person);
        var result = calculator.compute();
        //console.log(result);
        expect(result).to.containSubset({
            chart: {
                year: {hs: '乙 L-', eb: '未 wèi', hidStems: ['己 P-', '丁 F-', '乙 L-']},
                month: {hs: '壬 A+', eb: '午 wǔ', hidStems: ['丁 F-', '己 P-', '']},
                day: {hs: '己 P-', eb: '亥 hài', hidStems: ['壬 A+', '甲 L+', '']},
                hour: {hs: '癸 A-', eb: '酉 yǒu', hidStems: ['辛 M-', '', '']}
            },
            comment1: '',
            comment2: '',
            'an start': 0.36,
            luck: [{hs: '辛 M-', eb: '巳 sì'},
                {hs: '庚 M+', eb: '辰 chén'},
                {hs: '己 P-', eb: '卯 mǎo'},
                {hs: '戊 P+', eb: '寅 yín'},
                {hs: '丁 F-', eb: '丑 chǒu'},
                {hs: '丙 F+', eb: '子 zǐ'},
                {hs: '乙 L-', eb: '亥 hài'},
                {hs: '甲 L+', eb: '戌 xū'},
                {hs: '癸 A-', eb: '酉 yǒu'}],
            fw: -1
        });
    });

});