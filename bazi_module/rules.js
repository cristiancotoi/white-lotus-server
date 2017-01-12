'use strict';

var moment = require('moment-timezone');
var _ = require('underscore');

var utils = function (options) {
    var rules = options;

    if (isNumeric(options)) {
        rules = expandNumericOption(options);
    }

    function isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    /**
     * Expand user level into rules.
     * @param userLevel user level
     * @returns {{}}
     */
    function expandNumericOption(userLevel) {
        var expandedRules = {};
        if (userLevel === 0) {
            return expandedRules;
        }

        expandedRules = {
            'current luck pillar': true,
            'dm': true
        };

        if (userLevel >= 3) {
            expandedRules['gods strength for season'] = true;
            expandedRules['normal life type'] = true;
            expandedRules['gods strength'] = true;
        }

        if (userLevel >= 5) {
            expandedRules['branch relations'] = true;
        }

        if (userLevel >= 8) {
            expandedRules['shen sha'] = true;
            expandedRules['day star binomial'] = true;
        }
        return expandedRules;
    }

    function includes(item) {
        var generateAll = _.isUndefined(rules);
        var ruleIsValid = !!rules && !!rules[item];
        //console.log(item);
        //console.log(generateAll + ' || ' + ruleIsValid + ' -->' + (generateAll || ruleIsValid) + '\n');
        return generateAll || ruleIsValid;
    }

    return {
        includes: includes,

        // For testing purposes
        expandNumericOption: expandNumericOption
    };
};

module.exports = utils;