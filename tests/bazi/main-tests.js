var chai = require('chai');
var chaiSubset = require('chai-subset');
chai.use(chaiSubset);
var expect = chai.expect; // we are using the "expect" style of Chai

var connectToDb = require('./../../utils/db-utils');

var BaZiMain = require('./../../bazi_module/main');

var _ = require("underscore");

describe('BaZiMain basic calculations', function () {
    this.timeout(3000);
    before(function () {
        connectToDb();
    });

    it('check basic output values', function (done) {
        var person = {
            name: 'N',
            surname: 'S',
            date: {
                day: 24, month: 12, year: 1948, hour: 1, minute: 20
            },
            tz: 2, longitude: 28, gender: 'F'
        };

        function asserts(result) {
            expect(result.name).to.equal('N');
            expect(result.surname).to.equal('S');
            done();
        }

        BaZiMain(person, {json: asserts});
    });

    it('check chart data quality', function (done) {
        var person = {
            date: {
                day: 24, month: 12, year: 1948, hour: 1, minute: 20
            },
            tz: 2, longitude: 28, gender: 'F'

        };

        function asserts(result) {
            expect(result.phases.length).to.equal(5);
            expect(result.heavenlyStems.length).to.equal(10);
            expect(result.earthlyBranches.length).to.equal(12);
            done();
        }

        BaZiMain(person, {json: asserts});
    });

    it('check chart contents after calculations', function (done) {
        var person = {
            date: {
                day: 7, month: 6, year: 1955, hour: 17, minute: 30
            },
            tz: 2, longitude: 28, gender: 'M'

        };

        function asserts(result) {
            expect(result.chart).to.containSubset({
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
            expect(_.size(result.detailedChart)).to.equal(4);
            //console.log(result.detailedChart);
            done();
        }

        BaZiMain(person, {json: asserts});
    });

    it('check luck', function (done) {
        var person = {
            date: {
                day: 7, month: 6, year: 1955, hour: 17, minute: 30
            },
            tz: 2, longitude: 28, gender: 'M'

        };

        function asserts(result) {
            expect(result.detailedLuck[0]).to.not.be.null;
            //console.log(result.detailedLuck);
            done();
        }

        BaZiMain(person, {json: asserts});
    });

});