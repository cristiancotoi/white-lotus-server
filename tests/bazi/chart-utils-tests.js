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
        expect(utils.getNormalLifeType(input))
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
        expect(utils.getNormalLifeType(input))
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
        expect(utils.getNormalLifeType(input))
            .to.equal('己 P-');
    });

});