var chai = require('chai');
var chaiSubset = require('chai-subset');
chai.use(chaiSubset);
var expect = chai.expect; // we are using the "expect" style of Chai

var Utils = require('./../../common_module/utils');

describe('Common functions', function () {
    it('check stripping _id recursively', function () {
        var input = {
            day: 22, month: 4, year: 1984, hours: 22, minutes: 50,
            _id: 123,
            innerObj: {
                _id: 123, test: 1,
                innerInnerObj: {
                    _id: 'blah',
                    moreData: [
                        {_id: 'a', id: 'b'},
                        {_id: 'a', id: 'c'},
                        {_id: 'a', id: 'd'}
                    ]
                }
            }
        };

        var utils = Utils();
        utils.stripDbIds(input);

        expect(input).to.containSubset({
            "day": 22,
            "month": 4,
            "year": 1984,
            "hours": 22,
            "minutes": 50,
            "innerObj": {
                "test": 1,
                "innerInnerObj": {
                    "moreData": [
                        {"id": "b"},
                        {"id": "c"},
                        {"id": "d"}
                    ]
                }
            }
        });
    });

});