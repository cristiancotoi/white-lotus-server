let chai = require('chai');
let chaiSubset = require('chai-subset');
chai.use(chaiSubset);
let expect = chai.expect; // we are using the "expect" style of Chai

let Utils = require('./../../psquare_module/utils');

describe('Pythagorean Square utility tests', function () {
    it('simple calculations for single digits sum', function () {
        let utils = Utils({});
        expect(utils.sumDigits(1)).to.equal(1);
        expect(utils.sumDigits(11)).to.equal(2);
        expect(utils.sumDigits(19)).to.equal(10);
        expect(utils.sumDigits(29)).to.equal(11);
    });

    it('simple calculations for double digits sum', function () {
        let utils = Utils({});
        expect(utils.doubleSumDigits(1)).to.equal(1);
        expect(utils.doubleSumDigits(11)).to.equal(2);
        expect(utils.doubleSumDigits(19)).to.equal(1);
        expect(utils.doubleSumDigits(29)).to.equal(2);
    });

    it('check day digits summing', function () {
        expect(Utils({day: 23}).getDaySum()).to.equal(5);
        expect(Utils({day: 29}).getDaySum()).to.equal(2);
    });

    it('check month digits summing', function () {
        expect(Utils({month: 1}).getMonthSum()).to.equal(1);
        expect(Utils({month: 12}).getMonthSum()).to.equal(3);
    });

    it('check year digits summing', function () {
        expect(Utils({year: 1950}).getCosmicVibration()).to.equal(5);
        expect(Utils({year: 1959}).getCosmicVibration()).to.equal(5);
        expect(Utils({year: 1999}).getCosmicVibration()).to.equal(9);
    });

    it('check full year digits summing', function () {
        expect(Utils({year: 1950}).getYearFullSum()).to.equal(6);
        expect(Utils({year: 1959}).getYearFullSum()).to.equal(6);
        expect(Utils({year: 1999}).getYearFullSum()).to.equal(1);
    });

    it('check moment quality without hour', function () {
        expect(Utils({
            year: 1950,
            month: 1,
            day: 1
        })
            .getMoment()
            .toISOString()).to.equal('1950-01-01T00:00:00.000Z');
    });

    it('check moment quality max month', function () {
        expect(Utils({
            year: 1950,
            month: 12,
            day: 1
        })
            .getMoment()
            .toISOString()).to.equal('1950-12-01T00:00:00.000Z');
    });

    it('check moment quality with time', function () {
        expect(Utils({
            year: 1950,
            month: 12,
            day: 1,
            hour: 5,
            minutes: 50
        })
            .getMoment()
            .toISOString()).to.equal('1950-12-01T05:50:00.000Z');
    });

    it('check luck chart digits', function () {
        expect(Utils({
            year: 1950,
            month: 12,
            day: 1
        })
            .getLuckChartDigits())
            .to.containSubset({
            digits: [
                {position: 1, value: 2},
                {position: 2, value: 3},
                {position: 3, value: 4},
                {position: 4, value: 0},
                {position: 5, value: 0}
            ],
            number: 23400
        });
    });

    it('check years matrix with 5 columns', function () {
        let utils = Utils({
            year: 1950,
            month: 12,
            day: 1
        });
        let matrix = utils.getYearsMatrix(5);
        expect(matrix.length).to.equal(16);
        expect(matrix[0].length).to.equal(5);
        expect(matrix)
            .to.containSubset([
            [1950, 1951, 1952, 1953, 1954],
            [1955, 1956, 1957, 1958, 1959],
            [1960, 1961, 1962, 1963, 1964],
            [1965, 1966, 1967, 1968, 1969],
            [1970, 1971, 1972, 1973, 1974],
            [1975, 1976, 1977, 1978, 1979],
            [1980, 1981, 1982, 1983, 1984],
            [1985, 1986, 1987, 1988, 1989],
            [1990, 1991, 1992, 1993, 1994],
            [1995, 1996, 1997, 1998, 1999],
            [2000, 2001, 2002, 2003, 2004],
            [2005, 2006, 2007, 2008, 2009],
            [2010, 2011, 2012, 2013, 2014],
            [2015, 2016, 2017, 2018, 2019],
            [2020, 2021, 2022, 2023, 2024],
            [2025, 2026, 2027, 2028, 2029]
        ]);
    });

    it('check years matrix with 6 columns', function () {
        let utils = Utils({
            year: 1984,
            month: 12,
            day: 1
        });
        let matrix = utils.getYearsMatrix(6, 80);
        expect(matrix.length).to.equal(14);
        expect(matrix[0].length).to.equal(6);
        expect(matrix)
            .to.containSubset([
            [1984, 1985, 1986, 1987, 1988, 1989],
            [1990, 1991, 1992, 1993, 1994, 1995],
            [1996, 1997, 1998, 1999, 2000, 2001],
            [2002, 2003, 2004, 2005, 2006, 2007],
            [2008, 2009, 2010, 2011, 2012, 2013],
            [2014, 2015, 2016, 2017, 2018, 2019],
            [2020, 2021, 2022, 2023, 2024, 2025],
            [2026, 2027, 2028, 2029, 2030, 2031],
            [2032, 2033, 2034, 2035, 2036, 2037],
            [2038, 2039, 2040, 2041, 2042, 2043],
            [2044, 2045, 2046, 2047, 2048, 2049],
            [2050, 2051, 2052, 2053, 2054, 2055],
            [2056, 2057, 2058, 2059, 2060, 2061],
            [2062, 2063, 2064, 2065, 2066, 2067]
        ]);
    });

    it('check years matrix error handling', function () {
        let utils = Utils({
            year: 1984,
            month: 12,
            day: 1
        });
        try {
            utils.getYearsMatrix({});
            expect(true).to.equal(false);
        } catch (ex) {
            expect(ex).to.equal('Invalid parameter: [object Object]');
        }
    });

    it('check challenges for pre-2000', function () {
        let utils = Utils({
            year: 1984,
            month: 12,
            day: 1
        });
        let challenges = utils.getChallenges();
        expect(challenges).to.containSubset([
            {position: 1, value: 2},
            {position: 2, value: 3},
            {position: 3, value: 1},
            {position: 4, value: 1}]
        );
    });

    it('check challenges for post-2000', function () {
        let utils = Utils({
            year: 2000,
            month: 12,
            day: 29
        });
        let challenges = utils.getChallenges();
        expect(challenges).to.containSubset([
            {position: 1, value: 1},
            {position: 2, value: 0},
            {position: 3, value: 1},
            {position: 4, value: 1}
        ]);
    });

    it('check challenges interval for destiny number 1', function () {
        let utils = Utils({
            year: 1984,
            month: 4,
            day: 23
        });
        let chIntervals = utils.getChallengeAndOpportunityIntervals(1);
        expect(chIntervals).to.containSubset([
            {position: 1, min: 0, max: 35},
            {position: 2, min: 36, max: 44},
            {position: 3, min: 45, max: 53},
            {position: 4, min: 54, max: 62}
        ]);
    });

    it('check challenges interval for destiny number 5', function () {
        let utils = Utils({
            year: 1984,
            month: 4,
            day: 23
        });
        let chIntervals = utils.getChallengeAndOpportunityIntervals(5);
        expect(chIntervals).to.containSubset([
            {position: 1, min: 0, max: 31},
            {position: 2, min: 32, max: 40},
            {position: 3, min: 41, max: 49},
            {position: 4, min: 50, max: 58}
        ]);
    });

    it('check opportunities', function () {
        let utils = Utils({
            year: 1984,
            month: 4,
            day: 23
        });
        let opportunities = utils.getOpportunities();
        expect(opportunities).to.containSubset([
            {position: 1, value: 9},
            {position: 2, value: 9},
            {position: 3, value: 9},
            {position: 4, value: 8}
        ]);
    });

    it('check moment', function () {
        let utils = Utils({
            day: 5, month: 1, year: 1956,
            hour: 5, minutes: 30
        });
        let moment = utils.getMoment();
        expect(moment.toISOString()).to.equal('1956-01-05T05:30:00.000Z');

        expect(moment.toISOString()).to.equal('1956-01-05T05:30:00.000Z');
    });

});