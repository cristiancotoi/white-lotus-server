var chai = require('chai');
var chaiSubset = require('chai-subset');
chai.use(chaiSubset);
var expect = chai.expect; // we are using the 'expect' style of Chai

var Utils = require('./../../bazi_module/chart-utils');

describe('BaZi chart utils verifications', function () {

    it('check extracting visible stems without hour', function () {
        var input = {
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

        var utils = Utils();
        expect(utils.getVisibleStems(input))
            .to.containSubset(['己 P-', '丁 F-', '乙 L-']);
    });

    it('check extracting visible stems with hour', function () {
        var input = {
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
            },
            hour: {
                hs: '乙 L-',
                eb: '酉 yǒu'
            }
        };

        var utils = Utils();
        expect(utils.getVisibleStems(input))
            .to.containSubset(['己 P-', '丁 F-', '乙 L-', '乙 L-']);
    });

    it('check normal life type for main hidden stem', function () {
        var input = {
            year: {
                hs: '己 P-',
                eb: '未 wèi'
            },
            month: {
                hs: '丁 F-',
                eb: '丑 chǒu',
                hidStems: ['己 P-', '癸 A-', '辛 M-']
            },
            day: {
                hs: '乙 L-',
                eb: '酉 yǒu'
            },
            hour: {
                hs: '乙 L-',
                eb: '酉 yǒu'
            }
        };

        var utils = Utils();
        expect(utils.getNormalLifeTypeStem(input))
            .to.equal('己 P-');
    });

    it('check normal life type for prison hidden stem', function () {
        var input = {
            year: {
                hs: '癸 A-',
                eb: '未 wèi'
            },
            month: {
                hs: '丁 F-',
                eb: '丑 chǒu',
                hidStems: ['己 P-', '癸 A-', '辛 M-']
            },
            day: {
                hs: '乙 L-',
                eb: '酉 yǒu'
            },
            hour: {
                hs: '乙 L-',
                eb: '酉 yǒu'
            }
        };

        var utils = Utils();
        expect(utils.getNormalLifeTypeStem(input))
            .to.equal('癸 A-');
    });

    it('check normal life type for grave hidden stem', function () {
        var input = {
            year: {
                hs: '辛 M-',
                eb: '未 wèi'
            },
            month: {
                hs: '丁 F-',
                eb: '丑 chǒu',
                hidStems: ['己 P-', '癸 A-', '辛 M-']
            },
            day: {
                hs: '乙 L-',
                eb: '酉 yǒu'
            },
            hour: {
                hs: '乙 L-',
                eb: '酉 yǒu'
            }
        };

        var utils = Utils();
        expect(utils.getNormalLifeTypeStem(input))
            .to.equal('己 P-');
    });

    it('check gods association for yang DM', function () {
        var dm = '丙 F+';
        var utils = Utils();

        var gods = utils.getGods(dm);
        expect(gods)
            .to.containSubset({
            '丙 F+': 'F',
            '丁 F-': 'RW',
            '戊 P+': 'EG',
            '己 P-': 'HO',
            '庚 M+': 'IW',
            '辛 M-': 'DW',
            '壬 A+': 'DO',
            '癸 A-': '7K',
            '甲 L+': 'IR',
            '乙 L-': 'DR'
        });
    });

    it('check gods association for yin DM', function () {
        var dm = '丁 F-';
        var utils = Utils();

        var gods = utils.getGods(dm);
        expect(gods)
            .to.containSubset({
            '丙 F+': 'RW',
            '丁 F-': 'F',
            '戊 P+': 'HO',
            '己 P-': 'EG',
            '庚 M+': 'DW',
            '辛 M-': 'IW',
            '壬 A+': '7K',
            '癸 A-': 'DO',
            '甲 L+': 'DR',
            '乙 L-': 'IR'
        });
    });

});