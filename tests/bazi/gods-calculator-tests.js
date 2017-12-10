let chai = require('chai');
let chaiSubset = require('chai-subset');
chai.use(chaiSubset);
let expect = chai.expect; // we are using the 'expect' style of Chai

let _ = require('lodash');
let StrengthsCalculator = require('../../bazi_module/report/gods-calculator');

describe('BaZi utils age calculation', function () {
    let calculator = StrengthsCalculator();
    let stems = {
        '乙 L-': {
            presc: '乙 L-',
            phasepol: 'L-',
            phase: 'L',
            pol: '-'
        },
        '庚 M+': {
            presc: '庚 M+',
            phasepol: 'M+',
            phase: 'M',
            pol: '+'
        },
        '壬 A+': {
            presc: '壬 A+',
            phasepol: 'A+',
            phase: 'A',
            pol: '+'
        },
        '戊 P+': {
            presc: '戊 P+',
            phasepol: 'P+',
            phase: 'P',
            pol: '+'
        },
        '甲 L+': {
            presc: '甲 L+',
            phasepol: 'L+',
            phase: 'L',
            pol: '+'
        },
        '癸 A-': {
            presc: '癸 A-',
            phasepol: 'A-',
            phase: 'A',
            pol: '-'
        },
        '丁 F-': {
            presc: '丁 F-',
            phasepol: 'F-',
            phase: 'F',
            pol: '-'
        },
        '己 P-': {
            presc: '己 P-',
            phasepol: 'P-',
            phase: 'P',
            pol: '-'
        },
        '丙 F+': {
            presc: '丙 F+',
            phasepol: 'F+',
            phase: 'F',
            pol: '+'
        },
        '辛 M-': {
            presc: '辛 M-',
            phasepol: 'M-',
            phase: 'M',
            pol: '-'
        }
    };

    let branches = {
        '子 zǐ': {
            presc: '子 zǐ',
            h1: '癸 A-'
        },
        '丑 chǒu': {
            presc: '丑 chǒu',
            h1: '己 P-',
            h2: '癸 A-',
            h3: '辛 M-'
        },
        '寅 yín': {
            presc: '寅 yín',
            h1: '甲 L+',
            h2: '丙 F+',
            h3: '戊 P+'
        },
        '卯 mǎo': {
            presc: '卯 mǎo',
            h1: '乙 L-'
        },
        '申 shēn': {
            presc: '申 shēn',
            h1: '庚 M+',
            h2: '壬 A+',
            h3: '戊 P+'
        },
        '戌 xū': {
            presc: '戌 xū',
            h1: '戊 P+',
            h2: '辛 M-',
            h3: '丁 F-'
        },
        '酉 yǒu': {
            presc: '酉 yǒu',
            h1: '辛 M-'
        },
        '亥 hài': {
            presc: '亥 hài',
            h1: '壬 A+',
            h2: '甲 L+'
        },
        '辰 chén': {
            presc: '辰 chén',
            h1: '戊 P+',
            h2: '乙 L-',
            h3: '癸 A-'
        },
        '巳 sì': {
            presc: '巳 sì',
            h1: '丙 F+',
            h2: '戊 P+',
            h3: '庚 M+'
        },
        '未 wèi': {
            presc: '未 wèi',
            h1: '己 P-',
            h2: '丁 F-',
            h3: '乙 L-'
        },
        '午 wǔ': {
            presc: '午 wǔ',
            h1: '丁 F-',
            h2: '己 P-'
        }
    };

    it('check strength calculation for 13/1/1980', function () {
        let input = {
            year: {
                hs: '己 P-',
                eb: '未 wèi'
            },
            month: {
                hs: '丁 F-',
                eb: '丑 chǒu'
            },
            day: {
                hs: '乙 L-',
                eb: '酉 yǒu'
            }
        };
        let result = calculator.getStemsStrength(input, stems, branches);
        expect(result).to.containSubset({
            '乙 L-': {visible: 0, mainHidden: 0, prison: 0, grave: 20, total: 20, phase: 'L'},
            '庚 M+': {visible: 0, mainHidden: 0, prison: 0, grave: 0, phase: 'M'},
            '壬 A+': {visible: 0, mainHidden: 0, prison: 0, grave: 0},
            '戊 P+': {visible: 0, mainHidden: 0, prison: 0, grave: 0, phase: 'P'},
            '甲 L+': {visible: 0, mainHidden: 0, prison: 0, grave: 0},
            '癸 A-': {visible: 0, mainHidden: 0, prison: 20, grave: 0, total: 20},
            '丁 F-': {visible: 100, mainHidden: 0, prison: 20, grave: 0, total: 120},
            '己 P-': {visible: 100, mainHidden: 120, prison: 0, grave: 0, total: 220},
            '丙 F+': {visible: 0, mainHidden: 0, prison: 0, grave: 0},
            '辛 M-': {visible: 0, mainHidden: 100, prison: 0, grave: 20, total: 120}
        });
        let grandTotal = _.reduce(result, function (total, scoreObj) {
            return total + scoreObj.total;
        }, 0);
        expect(grandTotal).to.equal(500);
    });

    it('check strength calculation for 13/1/1980', function () {
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
        let result = calculator.getStemsStrength(input, stems, branches);
        expect(result).to.containSubset({
            '乙 L-': {visible: 100, mainHidden: 100, prison: 0, grave: 0, total: 200},
            '庚 M+': {visible: 0, mainHidden: 0, prison: 0, grave: 0, total: 0},
            '壬 A+': {visible: 100, mainHidden: 0, prison: 0, grave: 0, total: 100},
            '戊 P+': {visible: 0, mainHidden: 0, prison: 0, grave: 0, total: 0},
            '甲 L+': {visible: 0, mainHidden: 0, prison: 0, grave: 0, total: 0},
            '癸 A-': {visible: 100, mainHidden: 0, prison: 40, grave: 0, total: 140},
            '丁 F-': {visible: 0, mainHidden: 70, prison: 0, grave: 0, total: 70},
            '己 P-': {visible: 0, mainHidden: 120, prison: 30, grave: 0, total: 150},
            '丙 F+': {visible: 0, mainHidden: 0, prison: 0, grave: 0, total: 0},
            '辛 M-': {visible: 0, mainHidden: 0, prison: 0, grave: 40, total: 40}
        });
        let grandTotal = _.reduce(result, function (total, scoreObj) {
            return total + scoreObj.total;
        }, 0);
        expect(grandTotal).to.equal(700);
    });

});