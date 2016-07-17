var chai = require('chai');
var chaiSubset = require('chai-subset');
chai.use(chaiSubset);
var expect = chai.expect; // we are using the 'expect' style of Chai

var Stars = require('./../../bazi_module/stars');

describe('BaZi stars starsUtils verifications', function () {

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

        var starsUtils = Stars();
        expect(starsUtils.getBinomialStarOfDay(chart, stars))
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

        var starsUtils = Stars();
        expect(starsUtils.getBinomialStarOfDay(chart, stars))
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

        var starsUtils = Stars();
        expect(starsUtils.getBinomialStarOfDay(chart, stars))
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

    it('check symbolic star with bad type', function () {
        var starsUtils = Stars();
        try {
            starsUtils.isSymbolicStarPresent(undefined, undefined, 'dn bad type');
            expect('Should have thrown a bad type exception');
        } catch(ex) {
            expect(ex.message)
                .to.equal('Unknown type: dn bad type');
        }
    });

    it('check symbolic star for DM', function () {
        var chart = {
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

        var star = '丑 chǒu';

        var starsUtils = Stars();
        expect(starsUtils.isSymbolicStarPresent(chart, star, 'dayMaster'))
            .to.eql({
            star: '丑 chǒu',
            type: 'dayMaster',
            pillars: ['month']
        });
    });

    it('check symbolic star for DM everywhere', function () {
        var chart = {
            year: {
                eb: '酉 yǒu'
            },
            month: {
                eb: '酉 yǒu'
            },
            day: {
                eb: '酉 yǒu'
            },
            hour: {
                eb: '酉 yǒu'
            }
        };

        var star = '酉 yǒu';

        var starsUtils = Stars();
        expect(starsUtils.isSymbolicStarPresent(chart, star, 'dayMaster'))
            .to.eql({
            'star': '酉 yǒu',
            'type': 'dayMaster',
            'pillars': ['year', 'month', 'day', 'hour']
        });
    });

    it('check symbolic star for day branch not found', function () {
        var chart = {
            year: {
                eb: '酉 yǒu'
            },
            month: {
                eb: '丑 chǒu'
            },
            day: {
                eb: '未 wèi'
            },
            hour: {
                eb: '酉 yǒu'
            }
        };

        var star = '未 wèi';

        var starsUtils = Stars();
        expect(starsUtils.isSymbolicStarPresent(chart, star, 'dayBranch'))
            .to.eql({
            'star': '未 wèi',
            'type': 'dayBranch',
            'pillars': []
        });
    });

    it('check symbolic star for day branch found', function () {
        var chart = {
            year: {
                eb: '未 wèi'
            },
            month: {
                eb: '丑 chǒu'
            },
            day: {
                eb: '未 wèi'
            },
            hour: {
                eb: '酉 yǒu'
            }
        };

        var star = '未 wèi';

        var starsUtils = Stars();
        expect(starsUtils.isSymbolicStarPresent(chart, star, 'dayBranch'))
            .to.eql({
            'star': '未 wèi',
            'type': 'dayBranch',
            'pillars': ['year']
        });
    });

    it('check symbolic star for season found', function () {
        var chart = {
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

        var star = '己 P-';

        var starsUtils = Stars();
        expect(starsUtils.isSymbolicStarPresent(chart, star, 'season'))
            .to.eql({
            'star': '己 P-',
            'type': 'season',
            'pillars': ['year']
        });
    });

    it('check symbolic star for season not found', function () {
        var chart = {
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

        var star = '丁 F-';

        var starsUtils = Stars();
        expect(starsUtils.isSymbolicStarPresent(chart, star, 'season'))
            .to.eql({
            'star': '丁 F-',
            'type': 'season',
            'pillars': []
        });
    });

    it('check heavenly doctor symbolic star found', function () {
        var chart = {
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

        var star = '酉 yǒu';

        var starsUtils = Stars();
        expect(starsUtils.isSymbolicStarPresent(chart, star, 'heavenlyDoctor'))
            .to.eql({
            'star': '酉 yǒu',
            'type': 'heavenlyDoctor',
            'pillars': ['day']
        });
    });

    it('check heavenly doctor symbolic star found', function () {
        var chart = {
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

        var star = '酉 yǒu';

        var starsUtils = Stars();
        expect(starsUtils.isSymbolicStarPresent(chart, star, 'extPeachBlossom'))
            .to.eql({
            'star': '酉 yǒu',
            'type': 'extPeachBlossom',
            'pillars': ['hour']
        });
    });

});