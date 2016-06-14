var chai = require('chai');
var chaiSubset = require('chai-subset');
chai.use(chaiSubset);
var expect = chai.expect; // we are using the "expect" style of Chai

var connectToDb = require('./../../utils/db-utils');

var BaZiMain = require('./../../bazi_module/main');

var _ = require("underscore");

describe('BaZiMain basic calculations', function () {
    this.timeout(2000);
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

    it('check chart data quality for 24 12 1948', function (done) {
        var person = {
            date: {
                day: 24, month: 12, year: 1948, hour: 1, minute: 20
            },
            tz: 2, longitude: 28, gender: 'F'

        };

        function asserts(result) {
            expect(_.size(result.phases)).to.equal(5);
            expect(_.size(result.heavenlyStems)).to.equal(10);
            expect(_.size(result.earthlyBranches)).to.equal(12);
            done();
        }

        BaZiMain(person, {json: asserts});
    });

    it('check chart calculations for date without hour and minutes', function (done) {
        var person = {
            date: {year: 1984, month: 4, day: 23},
            gender: 'M',
            longitude: 28,
            tz: 2
        };

        function asserts(result) {
            expect(_.size(result.phases)).to.equal(5);
            expect(_.size(result.heavenlyStems)).to.equal(10);
            expect(_.size(result.earthlyBranches)).to.equal(12);
            expect(result.chart.chart.hour.hs).to.equal(undefined);
            expect(result.chart.chart.hour.eb).to.equal(undefined);
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
                startYear: 0.36,
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
            done();
        }

        BaZiMain(person, {json: asserts});
    });

    it('check chart contents for 30 11 1990 3:4 Magnus Carlsen', function (done) {
        var person = {
            date: {
                day: 30, month: 11, year: 1990, hour: 3, minute: 4
            },
            tz: 1, longitude: 10, gender: 'M'
        };


        function asserts(result) {
            expect(result.chart).to.containSubset({
                chart: {
                    "day": {"eb": "亥 hài", "hidStems": ["壬 A+", "甲 L+", ""], "hs": "己 P-"},
                    "hour": {"eb": "丑 chǒu", "hidStems": ["己 P-", "癸 A-", "辛 M-"], "hs": "乙 L-"},
                    "month": {"eb": "亥 hài", "hidStems": ["壬 A+", "甲 L+", ""], "hs": "丁 F-"},
                    "year": {"eb": "午 wǔ", "hidStems": ["丁 F-", "己 P-", ""], "hs": "庚 M+"}
                },
                startYear: 2.47,
                luck: [
                    {"eb": "子 zǐ", "hs": "戊 P+"},
                    {"eb": "丑 chǒu", "hs": "己 P-"},
                    {"eb": "寅 yín", "hs": "庚 M+"},
                    {"eb": "卯 mǎo", "hs": "辛 M-"},
                    {"eb": "辰 chén", "hs": "壬 A+"},
                    {"eb": "巳 sì", "hs": "癸 A-"},
                    {"eb": "午 wǔ", "hs": "甲 L+"},
                    {"eb": "未 wèi", "hs": "乙 L-"},
                    {"eb": "申 shēn", "hs": "丙 F+"}
                ],
                fw: 1
            });

            expect(_.size(result.detailedChart)).to.equal(4);

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
            done();
        }

        BaZiMain(person, {json: asserts});
    });

    it('check dm', function (done) {
        var person = {
            date: {
                day: 7, month: 6, year: 1955, hour: 17, minute: 30
            },
            tz: 2, longitude: 28, gender: 'M'

        };

        function asserts(result) {
            expect(result.dm).to.containSubset({
                happiness: 'Să facă parte dintr-un grup, să aparțină unui loc',
                'path to happiness': 'Să fie fertili, să fie sursa vieții.',
                negative: 'Prea moale, supus sacrificiului, posesiv, dominat, idealist, dependent, hedonist, încăpațânat, rasfațat, pesimist ',
                positive: 'Are încredere în sine, multe relații, inventiv, grijuliu, tolerant, productiv, descurcăreț, creativ, capabil, flexibil, delicat, matern, inovator, intuitiv, răbdător',
                physique: 'Moale și elastic',
                description: 'Ca orice element de pământ, este inflexibil și încăpățânat, dar comparativ cu un pământ yang (muntele), pământul yin acceptă compromisurile și se poate negocia cu ei.\nPersoană plină de grație, moderație, tolerantă, cu înclinații intelectuale, învață și înțelege repede, își schimbă cu ușurință părerile, adaptabilă.\nPentru acești oameni, este important să fie fertili, să sprijine totul. Grijulii, cu inimă bună, descurcăreți și creativi, poți conta pe ei. Le lipsește capacitatea de a lua decizii rapide și spontane.\nPersoane muncitoare, mereu se perfecționează.\nSuportă destul de multe abuzuri și nu-și retrag sprijinul chiar dacă trec prin momente neplăcute.',
                element: 'Grădină',
                id: '己 P-'
            });
            done();
        }

        BaZiMain(person, {json: asserts});
    });

});