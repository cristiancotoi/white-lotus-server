/**
 * Created by Cristian on 03/04/2016.
 */

function BaZiCalculatorFactory(input) {
    var priv = {};
    var TZ, DD, MM, YY, HR, MN, GEN;
    var ys, yb, ms, mb, ds, db, hs, hb;
    var A, AAA, DL, FW, J1, julianDay, JZJD, L, L0, LON, LP, M, S, T;
    var d, i;
    var ms0, ys0, yb0;
    var ds0, db0, hs0, hs1, hb0;
    var lps = [], lpb = [];
    var str01, str00, str1, str2;
    //var his1, his2, his3, dis1, dis2, dis3, mis1, mis2, mis3, yis1, yis2, yis3;
    var hourHidS, dayHidS, monthHidS, yearHidS;
    var luckPBranches = [], luckPStems = [];
    var longitude;
    var yearStemIndex, yearStem, yearBranchIndex, yearBranch;
    var monthStemIndex, monthStem, monthBranch;
    var dayStemIndex, dayStem, dayBranchIndex, dayBranch;
    var hourStemIndex, hourStem, hourBranch;
    var luckPillarStart;

    var gon = ["癸 A-", "甲 L+", "乙 L-", "丙 F+", "丁 F-", "戊 P+", "己 P-",
        "庚 M+", "辛 M-", "壬 A+", "癸 A-"];
    var ji = ["亥 hài", "子 zǐ", "丑 chǒu", "寅 yín", "卯 mǎo", "辰 chén", "巳 sì",
        "午 wǔ", "未 wèi", "申 shēn", "酉 yǒu", "戌 xū", "亥 hài", "子 zǐ"];

    var printStatus = function() {
        console.info('ds: %s, db: %s', ds, db);
        console.info('hs: %s, hb: %s', hs, hb);
    };

    function nextHSIndex(hsIndex, step) {
        var resultIndex = hsIndex;
        resultIndex += step;
        if ((resultIndex > 10) || (resultIndex < 0)) {
            resultIndex -= 10 * FW
        }
        return resultIndex;
    }

    function nextEBIndex(ebIndex, step) {
        var resultIndex = ebIndex;
        resultIndex += step;
        if ((resultIndex > 12) || (resultIndex < 0)) {
            resultIndex -= 12 * FW
        }
        return resultIndex;
    }

    /**
     * Return an array of hidden stems
     * @param branch target earthly branch
     * @returns {Array} max 3 hidden stems
     */
    function getHiddenStems(branch) {
        var hiddenStems = [];
        if (branch == "Porc [Hai]") {
            hiddenStems[0] = gon[9];
            hiddenStems[1] = gon[1];
            hiddenStems[2] = "";
        }
        if (branch == "Sobolan [Zi]") {
            hiddenStems[0] = gon[0];
            hiddenStems[1] = "";
            hiddenStems[2] = "";
        }
        if (branch == "Bou [Chou]") {
            hiddenStems[0] = gon[6];
            hiddenStems[1] = gon[0];
            hiddenStems[2] = gon[8];
        }
        if (branch == "Tigru [Yin]") {
            hiddenStems[0] = gon[1];
            hiddenStems[1] = gon[3];
            hiddenStems[2] = gon[5];
        }
        if (branch == "Iepure [Mao]") {
            hiddenStems[0] = gon[2];
            hiddenStems[1] = "";
            hiddenStems[2] = "";
        }
        if (branch == "Dragon [Chen]") {
            hiddenStems[0] = gon[5];
            hiddenStems[1] = gon[2];
            hiddenStems[2] = gon[0];
        }
        if (branch == "Sarpe [Si]") {
            hiddenStems[0] = gon[3];
            hiddenStems[1] = gon[5];
            hiddenStems[2] = gon[7];
        }
        if (branch == "Cal [Wu]") {
            hiddenStems[0] = gon[4];
            hiddenStems[1] = gon[6];
            hiddenStems[2] = "";
        }
        if (branch == "Capra [Wei]") {
            hiddenStems[0] = gon[6];
            hiddenStems[1] = gon[4];
            hiddenStems[2] = gon[2];
        }
        if (branch == "Maimuta [Shen]") {
            hiddenStems[0] = gon[7];
            hiddenStems[1] = gon[9];
            hiddenStems[2] = gon[5];
        }
        if (branch == "Cocos [You]") {
            hiddenStems[0] = gon[8];
            hiddenStems[1] = "";
            hiddenStems[2] = "";
        }
        if (branch == "Caine [Xu]") {
            hiddenStems[0] = gon[5];
            hiddenStems[1] = gon[8];
            hiddenStems[2] = gon[4];
        }
        return hiddenStems;
    }

    return {
        compute: function() {
            if (input.date == '') {
                console.info("Date is invalid");
                return;
            }
            var date;
            if(typeof input.date === 'string') {
                date = new Date(input.date);
                console.info("Date from string is: %s", date);
                MM = date.getMonth() + 1;
                DD = date.getDate();
                YY = date.getFullYear();
                HR = date.getHours();
                MN = date.getMinutes();
            } else {
                console.info("Date from components");
                date = input.date;
                MM = date.month;
                DD = date.day;
                YY = date.year;
                HR = date.hour;
                MN = date.minute;
            }
            if (YY < 1900) {
                console.info("Anul nasterii trebuie sa fie mai mare de 1900");
                return;
            }
            console.info('%s/%s/%s %s:%s', DD, MM, YY, HR, MN);
            timeZone = input.tz;
            gender = input.sex=='M'?1:-1;
            longitude = input.longitude;

            HR = HR + (MN / 60);
            //if ((longitude > -181) & (longitude < 181)) {
            if ((longitude > -181) && (longitude < 181)) {
                HR = HR + (longitude / 15 - timeZone);
            } else {
                throw 'Invalid longitude';
            }
            AAA = 1;
            // Unused if
            //if (year <= 1585) AAA = 0;
            julianDay = -1 * Math.floor(7 * (Math.floor((MM + 9) / 12) + YY) / 4);
            S = 1;
            if ((MM - 9) < 0) S = -1;
            A = Math.abs(MM - 9);
            J1 = Math.floor(YY + S * Math.floor(A / 7));
            J1 = -1 * Math.floor((Math.floor(J1 / 100) + 1) * 3 / 4);
            julianDay = julianDay + Math.floor(275 * MM / 9) + DD + (AAA * J1);
            julianDay = julianDay + 1721027 + 2 * AAA + 367 * YY - 0.5;
            JZJD = julianDay + (HR / 24);
            julianDay = julianDay + (HR / 24) - (timeZone / 24);

            // Julian centuries from 2000
            T = (julianDay - 2451545.0) / 36525;
            d = 2 * Math.PI / 360;

            // Mean anomaly of the sun
            M = 357.52910 + 35999.05030 * T - 0.0001559 * T * T - 0.00000048 * T * T * T;

            // Geometric mean longitude of the sun
            L0 = 280.46645 + 36000.76983 * T + 0.0003032 * T * T;
            // Equation of the sun's center
            DL = (1.914600 - 0.004817 * T - 0.000014 * T * T) * Math.sin(d * M);
            DL = DL + (0.019993 - 0.000101 * T) * Math.sin(d * 2 * M) + 0.000290 * Math.sin(d * 3 * M);

            // True longitude of the sun
            priv.L = L0 + DL;

            for (i = 0; priv.L > 360; i++) {
                priv.L -= 360;
            }
            for (i = 0; priv.L < 0; i++) {
                priv.L += 360;
            }
            if ((priv.L < 315) && (MM == 1 || MM == 2)) {
                yearStemIndex = YY - 4;
                yearBranchIndex = YY - 4;
            } else {
                yearStemIndex = YY - 3;
                yearBranchIndex = YY - 3;
            }
            yearStemIndex = yearStemIndex % 10;
            yearStem = gon[yearStemIndex];
            yearBranchIndex = yearBranchIndex % 12;
            yearBranch = ji[yearBranchIndex];
            FW = (yearStemIndex % 2 == 0)?(-1 * gender):gender;
            monthStemIndex = 1;
            for (i = 0; i < 6; i++) {
                if ((yearStemIndex == i) || (yearStemIndex == i + 5)) {
                    monthStemIndex = monthStemIndex + (i * 2);
                    if (monthStemIndex > 10) {
                        monthStemIndex = monthStemIndex - 10;
                    }
                }
            }
            str00 = "Data si ora introdusa de dvs sunt f aproape de Jie, ";
            str01 = "Consultati www.fourpillars.net.";
            str1 = "";
            if (priv.L > 314.95 && priv.L < 315.05) {
                str1 = str00 + "Inceputul primaverii.";
            }
            if (priv.L > 344.95 && priv.L < 345.05) {
                str1 = str00 + "Trezirea insectelor.";
            }
            if (priv.L > 14.95 && priv.L < 15.05) {
                str1 = str00 + "Senin stralucitor.";
            }
            if (priv.L > 44.95 && priv.L < 45.05) {
                str1 = str00 + "Inceputul verii.";
            }
            if (priv.L > 74.95 && priv.L < 75.05) {
                str1 = str00 + "Semanatul de primavara.";
            }
            if (priv.L > 104.95 && priv.L < 105.05) {
                str1 = str00 + "Caldura mica.";
            }
            if (priv.L > 134.95 && priv.L < 135.05) {
                str1 = str00 + "Inceputul toamnei.";
            }
            if (priv.L > 164.95 && priv.L < 165.05) {
                str1 = str00 + "Roua alba.";
            }
            if (priv.L > 194.95 && priv.L < 195.05) {
                str1 = str00 + "Roua rece.";
            }
            if (priv.L > 224.95 && priv.L < 225.05) {
                str1 = str00 + "Inceputul iernii.";
            }
            if (priv.L > 254.95 && priv.L < 255.05) {
                str1 = str00 + "Mai multa zapada.";
            }
            if (priv.L > 284.95 && priv.L < 285.05) {
                str1 = str00 + "Micul ger.";
            }


            if ((priv.L >= 315) && (priv.L < 345)) {
                monthBranch = ji[3];
                luckPBranches[0] = 3;
                luckPillarStart = (FW == 1)?((345 - priv.L) / 3):((priv.L - 315) / 3);
                /*if (FW == 1) {
                 luckPillarStart = ((345 - priv.L) / 3)
                 } else {
                 luckPillarStart = ((priv.L - 315) / 3)
                 }*/
            }
            if ((priv.L >= 345) || (priv.L < 15)) {
                monthBranch = ji[4];
                luckPBranches[0] = 4;
                monthStemIndex = monthStemIndex + 1;
                luckPillarStart = (FW == 1)?((375 - priv.L) / 3):((priv.L - 345) / 3);
                /*if (FW == 1) {
                 luckPillarStart = ((375 - priv.L) / 3)
                 } else {
                 luckPillarStart = ((priv.L - 345) / 3)
                 }*/
                if (luckPillarStart > 11) {
                    luckPillarStart = luckPillarStart - 120
                }
                if (luckPillarStart < 0) {
                    luckPillarStart = luckPillarStart + 120
                }
            }
            if ((priv.L >= 15) && (priv.L < 45)) {
                monthBranch = ji[5];
                luckPBranches[0] = 5;
                monthStemIndex = monthStemIndex + 2;
                luckPillarStart = (FW == 1)?((45 - priv.L) / 3):((priv.L - 15) / 3);
                /*if (FW == 1) {
                 luckPillarStart = ((45 - priv.L) / 3)
                 } else {
                 luckPillarStart = ((priv.L - 15) / 3)
                 }*/
            }
            if ((priv.L >= 45) && (priv.L < 75)) {
                monthBranch = ji[6];
                luckPBranches[0] = 6;
                monthStemIndex = monthStemIndex + 3;
                if (FW == 1) {
                    luckPillarStart = ((75 - priv.L) / 3)
                } else {
                    luckPillarStart = ((priv.L - 45) / 3)
                }
            }
            if ((priv.L >= 75) && (priv.L < 105)) {
                monthBranch = ji[7];
                luckPBranches[0] = 7;
                monthStemIndex = monthStemIndex + 4;
                if (FW == 1) {
                    luckPillarStart = ((105 - priv.L) / 3)
                } else {
                    luckPillarStart = ((priv.L - 75) / 3)
                }
            }
            if ((priv.L >= 105) && (priv.L < 135)) {
                monthBranch = ji[8];
                luckPBranches[0] = 8;
                monthStemIndex = monthStemIndex + 5;
                if (FW == 1) {
                    luckPillarStart = ((135 - priv.L) / 3)
                } else {
                    luckPillarStart = ((priv.L - 105) / 3)
                }
            }
            if ((priv.L >= 135) && (priv.L < 165)) {
                monthBranch = ji[9];
                luckPBranches[0] = 9;
                monthStemIndex = monthStemIndex + 6;
                if (FW == 1) {
                    luckPillarStart = ((165 - priv.L) / 3)
                } else {
                    luckPillarStart = ((priv.L - 135) / 3)
                }
            }
            if ((priv.L >= 165) && (priv.L < 195)) {
                monthBranch = ji[10];
                luckPBranches[0] = 10;
                monthStemIndex = monthStemIndex + 7;
                if (FW == 1) {
                    luckPillarStart = ((195 - priv.L) / 3)
                } else {
                    luckPillarStart = ((priv.L - 165) / 3)
                }
            }
            if ((priv.L >= 195) && (priv.L < 225)) {
                monthBranch = ji[11];
                luckPBranches[0] = 11;
                monthStemIndex = monthStemIndex + 8;
                if (FW == 1) {
                    luckPillarStart = ((225 - priv.L) / 3)
                } else {
                    luckPillarStart = ((priv.L - 195) / 3)
                }
            }
            if ((priv.L >= 225) && (priv.L < 255)) {
                monthBranch = ji[12];
                luckPBranches[0] = 12;
                monthStemIndex = monthStemIndex + 9;
                if (FW == 1) {
                    luckPillarStart = ((255 - priv.L) / 3)
                } else {
                    luckPillarStart = ((priv.L - 225) / 3)
                }
            }
            if ((priv.L >= 255) && (priv.L < 285)) {
                monthBranch = ji[1];
                luckPBranches[0] = 1;
                monthStemIndex = monthStemIndex + 10;
                if (FW == 1) {
                    luckPillarStart = ((285 - priv.L) / 3)
                } else {
                    luckPillarStart = ((priv.L - 255) / 3)
                }
            }
            if ((priv.L >= 285) && (priv.L < 315)) {
                monthBranch = ji[2];
                luckPBranches[0] = 2;
                monthStemIndex = monthStemIndex + 11;
                if (FW == 1) {
                    luckPillarStart = ((315 - priv.L) / 3)
                } else {
                    luckPillarStart = ((priv.L - 285) / 3)
                }
            }
            if (monthStemIndex > 10) {
                monthStemIndex = monthStemIndex - 10;
            }
            monthStem = gon[monthStemIndex];
            luckPStems[0] = monthStemIndex;
            dayStemIndex = "" + Math.floor(JZJD + 0.5);
            dayStem = gon[dayStemIndex.substring(6, 7)];
            dayBranchIndex = Math.floor(JZJD - 12 * Math.floor((JZJD + 0.5) / 12) + 0.5) + 2;
            dayBranch = ji[dayBranchIndex];
            hs0 = 1;
            hourStemIndex = 0;
            for (i = 1; i < 5; i++) {
                if ((eval(dayStemIndex.substring(6, 7)) == i) || (eval(dayStemIndex.substring(6, 7)) == i + 5)) {
                    hourStemIndex = hs0;
                }
                hs0 = hs0 + 2;
            }
            if ((eval(dayStemIndex.substring(6, 7)) == 0) || (eval(dayStemIndex.substring(6, 7)) == 5)) {
                hourStemIndex = 9;
            }
            if ((HR == 23) || (HR > 23 && HR < 24)) {
                hourStemIndex = hourStemIndex + 2;
            }
            if (((HR == 23) || (HR > 23 && HR < 24)) || ((HR == 0) || (HR > 0 && HR < 1) || (HR == 24))) {
                hourBranch = ji[1];
            }
            hb0 = 2;
            for (i = 1; i < 23; i++) {
                if ((HR == i) || (HR > i && HR < i + 2)) {
                    hourBranch = ji[hb0];
                    hourStemIndex = hourStemIndex + hb0 - 1;
                }
                i = i + 1;
                hb0 = hb0 + 1;
            }
            if (hourStemIndex > 10) {
                hourStemIndex = hourStemIndex - 10
            }
            hourStem = gon[hourStemIndex];
            luckPillarStart = (Math.floor(luckPillarStart * 100) / 100);

            hourHidS = getHiddenStems(hourBranch);
            dayHidS = getHiddenStems(dayBranch);
            monthHidS = getHiddenStems(monthBranch);
            yearHidS = getHiddenStems(yearBranch);


            var indexB = luckPBranches[0];
            var indexS = luckPStems[0];
            for(i = 0; i < 9; i++) {
                indexB = nextEBIndex(indexB, FW);
                luckPBranches[i] = ji[indexB];

                indexS = nextHSIndex(indexS, FW);
                luckPStems[i] = gon[indexS];
            }

            console.info("An %s %s",ys, yb);
            console.info("Luna %s %s",ms, mb);
            console.info("Zi %s %s",ds, db);
            console.info("Ora %s %s",hs, hb);

            return {
                /*year: {hs: ys, eb: yb},
                 month: {hs: ms, eb: mb},
                 day: {hs: ds, eb: db},
                 hour: {hs: hs, eb: hb},*/
                "An": new Binomial(ys, yb),
                "Luna": new Binomial(ms, mb),
                "Zi": new Binomial(ds, db),
                "Ora": new Binomial(hs, hb),
                comment1: str1,
                comment2: str2,
                'an start': LP
            };
            /*form.ys.value = ys; // year HS
             form.ms.value = ms; // month HS
             form.ds.value = ds; // day HS
             form.hs.value = hs; // hour HS
             form.yb.value = yb; // year EB
             form.mb.value = mb; // month EB
             form.db.value = db; // day EB
             form.hb.value = hb; // hour EB
             form.comment1.value = str1; // comments ?
             form.comment2.value = str2;
             // Hidden stems
             form.hs1.value = his1;
             form.hs2.value = his2;
             form.hs3.value = his3;
             form.ds1.value = dis1;
             form.ds2.value = dis2;
             form.ds3.value = dis3;
             form.ms1.value = mis1;
             form.ms2.value = mis2;
             form.ms3.value = mis3;
             form.ys1.value = yis1;
             form.ys2.value = yis2;
             form.ys3.value = yis3;

             // luck pillars
             form.lp1.value = LP;
             form.lp2.value = LP + 10;
             form.lp3.value = LP + 20;
             form.lp4.value = LP + 30;
             form.lp5.value = LP + 40;
             form.lp6.value = LP + 50;
             form.lp7.value = LP + 60;
             form.lp8.value = LP + 70;
             form.lps[1].value = lps[1];
             form.lps[2].value = lps[2];
             form.lps[3].value = lps[3];
             form.lps[4].value = lps[4];
             form.lps[5].value = lps[5];
             form.lps[6].value = lps[6];
             form.lps[7].value = lps[7];
             form.lps[8].value = lps[8];
             form.lpb[1].value = lpb[1];
             form.lpb[2].value = lpb[2];
             form.lpb[3].value = lpb[3];
             form.lpb[4].value = lpb[4];
             form.lpb[5].value = lpb[5];
             form.lpb[6].value = lpb[6];
             form.lpb[7].value = lpb[7];
             form.lpb[8].value = lpb[8];*/
        }
    };
}

function testCalculator(){
    var input = {
        date: '4/22/1984 22:50:00',
        sex: 'M',
        tz: 2,
        longitude: 28
    };
    var output = BaZiCalculatorFactory(input).compute();

    console.info(output.An.getCompressedVersion());
    console.info(output.Luna.getCompressedVersion());
    console.info(output.Zi.getCompressedVersion());
    console.info(output.Ora.getCompressedVersion());
    console.info(output['an start']);
}

function testCalculatorFromComponents(){
    var input = {
        date: {
            MM: 4,
            DD: 22,
            YY: 1984,
            HR: 22,
            MN: 50
        },
        sex: 'M',
        tz: 2,
        longitude: 28
    };
    console.info(JSON.stringify(input));
    var output = BaZiCalculatorFactory(input).compute();

    console.info(output.An.getCompressedVersion());
    console.info(output.Luna.getCompressedVersion());
    console.info(output.Zi.getCompressedVersion());
    console.info(output.Ora.getCompressedVersion());
    console.info(output['an start']);
}