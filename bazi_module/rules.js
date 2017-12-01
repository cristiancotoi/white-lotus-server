'use strict';

let moment = require('moment-timezone');
let _ = require('lodash');

let utils = function (options) {
    let rules = options;

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
        let expandedRules = {};
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
        let generateAll = _.isUndefined(rules);
        let ruleIsValid = !!rules && !!rules[item];
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