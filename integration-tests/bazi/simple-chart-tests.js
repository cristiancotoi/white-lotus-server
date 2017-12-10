let chai = require('chai');
let chaiSubset = require('chai-subset');
chai.use(chaiSubset);
let expect = chai.expect; // we are using the "expect" style of Chai

let connectToDb = require('../../utils/db-utils');

let BaZiMain = require('../../bazi_module/main');

let _ = require("lodash");
let moment = require("moment");

describe('BaZiMain basic calculations', function () {
    this.timeout(2000);
    before(function () {
        connectToDb();
    });

    it('check basic output for a simple chart with gender', function (done) {
        let context = {
            "date": "2017-09-18T23:25:00+02:00",
            "longitude": 27.35,
            "dst": false,
            "gender": "M"
        };

        function asserts(result) {
            expect(result.age_string, "Age object is missing").to.be.an('object');
            expect(result.chart, "Main chart object is missing").to.be.an('object');
            expect(result.chart.astroData, "Astro data object is missing").to.be.an('object');
            expect(result.chart.chart, "4 pillars object is missing").to.be.an('object');
            expect(result.detailedChart, "Chart details object is missing").to.be.an('object');
            expect(result.sex, "Gender string is missing").to.be.an('string').that.equals('M');
            done();
        }

        BaZiMain(context).make({
            'core elements': false
        }, {json: asserts});
    });

    it('check basic output for a simple chart without gender', function (done) {
        let context = {
            "date": "2017-09-18T23:25:00+02:00",
            "longitude": 27.35,
            "dst": false
        };

        function asserts(result) {
            expect(result.age_string, "Age object is missing").to.be.an('object');
            expect(result.chart, "Main chart object is missing").to.be.an('object');
            expect(result.chart.astroData, "Astro data object is missing").to.be.an('object');
            expect(result.chart.chart, "4 pillars object is missing").to.be.an('object');
            expect(result.detailedChart, "Chart details object is missing").to.be.an('object');
            expect(result.sex, "Gender string should be missing").to.equals(undefined);
            done();
        }

        BaZiMain(context).make({
            'core elements': false
        }, {json: asserts});
    });
});