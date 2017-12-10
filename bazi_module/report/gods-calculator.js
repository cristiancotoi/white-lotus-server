'use strict';

let _ = require("lodash");

let strengthCalculator = function () {
    function getStemsStrength(detailedChart, stems, branches) {
        let stemsScores = {};
        // Prepare the output
        _.each(stems, function (stem) {
            stemsScores[stem.presc] = {
                visible: 0,
                mainHidden: 0,
                prison: 0,
                grave: 0,
                phase: stem.phase
            };
        });

        _.each(detailedChart, function (pillar) {
            let eb = branches[pillar.eb];
            stemsScores[pillar.hs].visible += 100;
            if (!_.isUndefined(eb.h3)) {
                stemsScores[eb.h1].mainHidden += 60;
                stemsScores[eb.h2].prison += 20;
                stemsScores[eb.h3].grave += 20;
            } else if (!_.isUndefined(eb.h2)) {
                stemsScores[eb.h1].mainHidden += 70;
                stemsScores[eb.h2].prison += 30;
            } else {
                stemsScores[eb.h1].mainHidden += 100;
            }
        });

        stemsScores[detailedChart.day.hs].visible -= 100;

        _.each(stems, function (stem) {
            let st = stemsScores[stem.presc];
            st.total = st.visible + st.mainHidden + st.prison + st.grave;
        });

        return stemsScores;
    }

    return {
        getStemsStrength: getStemsStrength
    };
};

module.exports = strengthCalculator;