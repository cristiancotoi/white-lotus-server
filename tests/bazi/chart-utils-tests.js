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

    it('check binomial star no match', function () {
        var chart = {
            month: {
                eb: '丑 chǒu'
            },
            day: {
                hs: '乙 L-',
                eb: '酉 yǒu'
            }
        };

        var stars = [
            {
                season: '酉 yǒu',
                hs: '乙 L-',
                eb: '酉 yǒu',
                category: 'blah'
            }
        ];

        var utils = Utils();
        expect(utils.getBinomialStarOfDay(chart, stars))
            .to.eql({});
    });

    it('check binomial star without season', function () {
        var chart = {
            month: {
                eb: '丑 chǒu'
            },
            day: {
                hs: '乙 L-',
                eb: '酉 yǒu'
            }
        };

        var stars = [
            {
                hs: '乙 L-',
                eb: '酉 yǒu',
                category: 'blah'
            }
        ];

        var utils = Utils();
        expect(utils.getBinomialStarOfDay(chart, stars))
            .to.eql({
            'blah': {
                'category': 'blah',
                'eb': '酉 yǒu',
                'hs': '乙 L-'
            }
        });
    });

    it('check binomial star with season', function () {
        var chart = {
            month: {
                eb: '丑 chǒu'
            },
            day: {
                hs: '乙 L-',
                eb: '酉 yǒu'
            }
        };

        var stars = [
            {
                season: '丑 chǒu',
                hs: '乙 L-',
                eb: '酉 yǒu',
                category: 'blah 1'
            },
            {
                season: '丑 chǒu',
                hs: '乙 L-',
                eb: '酉 yǒu',
                category: 'blah 2'
            }
        ];

        var utils = Utils();
        expect(utils.getBinomialStarOfDay(chart, stars))
            .to.eql({
            'blah 1': {
                category: 'blah 1',
                season: '丑 chǒu',
                eb: '酉 yǒu',
                hs: '乙 L-'
            },
            'blah 2': {
                category: 'blah 2',
                season: '丑 chǒu',
                eb: '酉 yǒu',
                hs: '乙 L-'
            }
        });
    });

});