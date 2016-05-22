/**
 * Created by Cristian on 03/04/2016.
 */

function BaZiCalculatorFactory_raw(input) {
    var TZ, DD, MM, YY, HR, MN, GEN;
    var ys, yb, ms, mb, ds, db, hs, hb;
    var A, AAA, DL, FW, J1, JD, JZJD, L, L0, LON, LP, M, S, T;

    var printStatus = function() {
        Logger.log('ds: %s, db: %s', ds, db);
        Logger.log('hs: %s, hb: %s', hs, hb);
    };

    var self = {
        compute: function() {
            if (input.date == '') {
                Logger.log("Date is invalid");
                return;
            }
            if(typeof input.date === 'string') {
                var date = new Date(input.date);
                Logger.log("Date from string is: %s", date);
                MM = date.getMonth() + 1;
                DD = date.getDate();
                YY = date.getFullYear();
                HR = date.getHours();
                MN = date.getMinutes();
            } else {
                Logger.log("Date from components");
                var date = input.date;
                MM = date.month;
                DD = date.day;
                YY = date.year;
                HR = date.hour;
                MN = date.minute;
            }
            if (YY < 1900) {
                Logger.log("Anul nasterii trebuie sa fie mai mare de 1900");
                return;
            }
            Logger.log('%s/%s/%s %s:%s', DD, MM, YY, HR, MN);
            timeZone = input.tz;
            gender = input.sex=='M'?1:-1;
            longitude = input.longitude;

            var gon = Array("癸 A-", "甲 L+", "乙 L-", "丙 F+", "丁 F-", "戊 P+", "己 P-",
                "庚 M+", "辛 M-", "壬 A+", "癸 A-");
            var ji = Array("亥 hài", "子 zǐ", "丑 chǒu", "寅 yín", "卯 mǎo", "辰 chén", "巳 sì",
                "午 wǔ", "未 wèi", "申 shēn", "酉 yǒu", "戌 xū", "亥 hài", "子 zǐ");

            with(Math) {
                HR = HR + (MN / 60);
                if ((longitude > -181) & (longitude < 181)) HR = HR + (longitude / 15 - timeZone);
                AAA = 1;
                if (YY <= 1585) AAA = 0;
                JD = -1 * floor(7 * (floor((MM + 9) / 12) + YY) / 4);
                S = 1;
                if ((MM - 9) < 0) S = -1;
                A = abs(MM - 9);
                J1 = floor(YY + S * floor(A / 7));
                J1 = -1 * floor((floor(J1 / 100) + 1) * 3 / 4);
                JD = JD + floor(275 * MM / 9) + DD + (AAA * J1);
                JD = JD + 1721027 + 2 * AAA + 367 * YY - 0.5;
                JZJD = JD + (HR / 24);
                JD = JD + (HR / 24) - (timeZone / 24);
                T = (JD - 2451545.0) / 36525;
                d = 2 * PI / 360;
                M = 357.52910 + 35999.05030 * T - 0.0001559 * T * T - 0.00000048 * T * T * T;
                L0 = 280.46645 + 36000.76983 * T + 0.0003032 * T * T;
                DL = (1.914600 - 0.004817 * T - 0.000014 * T * T) * sin(d * M);
                DL = DL + (0.019993 - 0.000101 * T) * sin(d * 2 * M) + 0.000290 * sin(d * 3 * M);
                L = L0 + DL;
                Logger.log('L0: %s, DL: %s', L0, DL)
                for (var i = 0; L > 360; i++) {
                    L = L - 360;
                }
                for (var i = 0; L < 0; i++) {
                    L = L + 360;
                }
                if ((L < 315) && (MM == 1 || MM == 2)) {
                    ys0 = YY - 4;
                    yb0 = YY - 4;
                } else {
                    ys0 = YY - 3;
                    yb0 = YY - 3;
                }
                for (var i = 0; ys0 > 10; i++) {
                    ys0 = ys0 - 10;
                }
                ys = gon[ys0];
                for (var i = 0; yb0 > 12; i++) {
                    yb0 = yb0 - 12;
                }
                if ((ys0 == 0 || ys0 == 2 || ys0 == 4 || ys0 == 6 || ys0 == 8 || ys0 == 10)) {
                    FW = -1 * gender
                } else {
                    FW = 1 * gender
                }
                yb = ji[yb0];
                ms0 = 1
                for (var i = 0; i < 6; i++) {
                    if ((ys0 == i) || (ys0 == i + 5)) {
                        ms0 = ms0 + (i * 2)
                        if (ms0 > 10) {
                            ms0 = ms0 - 10;
                        }
                    }
                }
                //form.comment1.value = "";
                //form.comment2.value = "";
                str00 = "Data si ora introdusa de dvs sunt f aproape de Jie, "
                str01 = "Consultati www.fourpillars.net."
                str1 = "";
                str2 = "";
                if (L > 314.95 && L < 315.05) {
                    str1 = str00 + "Inceputul primaverii.";
                    str2 = str01;
                }
                if (L > 344.95 && L < 345.05) {
                    str1 = str00 + "Trezirea insectelor.";
                    str2 = str01;
                }
                if (L > 14.95 && L < 15.05) {
                    str1 = str00 + "Senin stralucitor.";
                    str2 = str01;
                }
                if (L > 44.95 && L < 45.05) {
                    str1 = str00 + "Inceputul verii.";
                    str2 = str01;
                }
                if (L > 74.95 && L < 75.05) {
                    str1 = str00 + "Semanatul de primavara.";
                    str2 = str01;
                }
                if (L > 104.95 && L < 105.05) {
                    str1 = str00 + "Lesser Heat.";
                    str2 = str01;
                }
                if (L > 134.95 && L < 135.05) {
                    str1 = str00 + "Inceputul toamnei.";
                    str2 = str01;
                }
                if (L > 164.95 && L < 165.05) {
                    str1 = str00 + "Roua alba.";
                    str2 = str01;
                }
                if (L > 194.95 && L < 195.05) {
                    str1 = str00 + "Roua rece.";
                    str2 = str01;
                }
                if (L > 224.95 && L < 225.05) {
                    str1 = str00 + "Inceputul iernii.";
                    str2 = str01;
                }
                if (L > 254.95 && L < 255.05) {
                    str1 = str00 + "Mai multa zapada.";
                    str2 = str01;
                }
                if (L > 284.95 && L < 285.05) {
                    str1 = str00 + "Micul ger.";
                    str2 = str01;
                }
                if ((L == 315 || L > 315) && (L < 345)) {
                    mb = ji[3];
                    lpb0 = 3;
                    if (FW == 1) {
                        LP = ((345 - L) / 3)
                    } else {
                        LP = ((L - 315) / 3)
                    }
                }
                if ((L == 345 || L > 345) || (L < 15)) {
                    mb = ji[4];
                    lpb0 = 4;
                    ms0 = ms0 + 1;
                    if (FW == 1) {
                        LP = ((375 - L) / 3)
                    } else {
                        LP = ((L - 345) / 3)
                    }
                    if (LP > 11) {
                        LP = LP - 120
                    }
                    if (LP < 0) {
                        LP = LP + 120
                    }
                }
                if ((L == 15 || L > 15) && (L < 45)) {
                    mb = ji[5];
                    lpb0 = 5;
                    ms0 = ms0 + 2;
                    if (FW == 1) {
                        LP = ((45 - L) / 3)
                    } else {
                        LP = ((L - 15) / 3)
                    }
                }
                if ((L == 45 || L > 45) && (L < 75)) {
                    mb = ji[6];
                    lpb0 = 6;
                    ms0 = ms0 + 3;
                    if (FW == 1) {
                        LP = ((75 - L) / 3)
                    } else {
                        LP = ((L - 45) / 3)
                    }
                }
                if ((L == 75 || L > 75) && (L < 105)) {
                    mb = ji[7];
                    lpb0 = 7;
                    ms0 = ms0 + 4;
                    if (FW == 1) {
                        LP = ((105 - L) / 3)
                    } else {
                        LP = ((L - 75) / 3)
                    }
                }
                if ((L == 105 || L > 105) && (L < 135)) {
                    mb = ji[8];
                    lpb0 = 8;
                    ms0 = ms0 + 5;
                    if (FW == 1) {
                        LP = ((135 - L) / 3)
                    } else {
                        LP = ((L - 105) / 3)
                    }
                }
                if ((L == 135 || L > 135) && (L < 165)) {
                    mb = ji[9];
                    lpb0 = 9;
                    ms0 = ms0 + 6;
                    if (FW == 1) {
                        LP = ((165 - L) / 3)
                    } else {
                        LP = ((L - 135) / 3)
                    }
                }
                if ((L == 165 || L > 165) && (L < 195)) {
                    mb = ji[10];
                    lpb0 = 10;
                    ms0 = ms0 + 7;
                    if (FW == 1) {
                        LP = ((195 - L) / 3)
                    } else {
                        LP = ((L - 165) / 3)
                    }
                }
                if ((L == 195 || L > 195) && (L < 225)) {
                    mb = ji[11];
                    lpb0 = 11;
                    ms0 = ms0 + 8;
                    if (FW == 1) {
                        LP = ((225 - L) / 3)
                    } else {
                        LP = ((L - 195) / 3)
                    }
                }
                if ((L == 225 || L > 225) && (L < 255)) {
                    mb = ji[12];
                    lpb0 = 12;
                    ms0 = ms0 + 9;
                    if (FW == 1) {
                        LP = ((255 - L) / 3)
                    } else {
                        LP = ((L - 225) / 3)
                    }
                }
                Logger.log(L);
                if ((L == 255 || L > 255) && (L < 285)) {
                    mb = ji[1];
                    lpb0 = 1;
                    ms0 = ms0 + 10;
                    if (FW == 1) {
                        LP = ((285 - L) / 3)
                    } else {
                        LP = ((L - 255) / 3)
                    }
                    Logger.log('mb: %s, ms0: %s, LP: %s', mb, ms0, LP);
                }
                if ((L == 285 || L > 285) && (L < 315)) {
                    mb = ji[2];
                    lpb0 = 2;
                    ms0 = ms0 + 11;
                    if (FW == 1) {
                        LP = ((315 - L) / 3)
                    } else {
                        LP = ((L - 285) / 3)
                    }
                }
                if (ms0 > 10) {
                    ms0 = ms0 - 10;
                }
                ms = gon[ms0];
                lps0 = ms0
                ds0 = "" + floor(JZJD + 0.5);
                ds = gon[ds0.substring(6, 7)];
                db0 = floor(JZJD - 12 * floor((JZJD + 0.5) / 12) + 0.5) + 2;
                db = ji[db0];
                hs0 = 1
                hs1 = 0
                for (var i = 1; i < 5; i++) {
                    if ((eval(ds0.substring(6, 7)) == i) || (eval(ds0.substring(6, 7)) == i + 5)) {
                        hs1 = hs0;
                    }
                    hs0 = hs0 + 2;
                }
                if ((eval(ds0.substring(6, 7)) == 0) || (eval(ds0.substring(6, 7)) == 5)) {
                    hs1 = 9;
                }
                if ((HR == 23) || (HR > 23 && HR < 24)) {
                    hs1 = hs1 + 2;
                }
                if (((HR == 23) || (HR > 23 && HR < 24)) || ((HR == 00) || (HR > 0 && HR < 1) || (HR == 24))) {
                    hb = ji[1];
                }
                hb0 = 2
                for (var i = 1; i < 23; i++) {
                    if ((HR == i) || (HR > i && HR < i + 2)) {
                        hb = ji[hb0];
                        hs1 = hs1 + hb0 - 1;
                    }
                    i = i + 1;
                    hb0 = hb0 + 1;
                }
                if (hs1 > 10) {
                    hs1 = hs1 - 10
                }
                hs = gon[hs1];
            }
            printStatus();
            with(Math) {
                LP = (floor(LP * 100) / 100);
            }
            if (hb == "Porc [Hai]") {
                his1 = gon[9]
                his2 = gon[1]
                his3 = ""
            }
            if (hb == "Sobolan [Zi]") {
                his1 = gon[0]
                his2 = ""
                his3 = ""
            }
            if (hb == "Bou [Chou]") {
                his1 = gon[6]
                his2 = gon[0]
                his3 = gon[8]
            }
            if (hb == "Tigru [Yin]") {
                his1 = gon[1]
                his2 = gon[3]
                his3 = gon[5]
            }
            if (hb == "Iepure [Mao]") {
                his1 = gon[2]
                his2 = ""
                his3 = ""
            }
            if (hb == "Dragon [Chen]") {
                his1 = gon[5]
                his2 = gon[2]
                his3 = gon[0]
            }
            if (hb == "Sarpe [Si]") {
                his1 = gon[3]
                his2 = gon[5]
                his3 = gon[7]
            }
            if (hb == "Cal [Wu]") {
                his1 = gon[4]
                his2 = gon[6]
                his3 = ""
            }
            if (hb == "Capra [Wei]") {
                his1 = gon[6]
                his2 = gon[4]
                his3 = gon[2]
            }
            if (hb == "Maimuta [Shen]") {
                his1 = gon[7]
                his2 = gon[9]
                his3 = gon[5]
            }
            if (hb == "Cocos [You]") {
                his1 = gon[8]
                his2 = ""
                his3 = ""
            }
            if (hb == "Caine [Xu]") {
                his1 = gon[5]
                his2 = gon[8]
                his3 = gon[4]
            }
            if (db == "Porc [Hai]") {
                dis1 = gon[9]
                dis2 = gon[1]
                dis3 = ""
            }
            if (db == "Sobolan [Zi]") {
                dis1 = gon[0]
                dis2 = ""
                dis3 = ""
            }
            if (db == "Bou [Chou]") {
                dis1 = gon[6]
                dis2 = gon[0]
                dis3 = gon[8]
            }
            if (db == "Tigru [Yin]") {
                dis1 = gon[1]
                dis2 = gon[3]
                dis3 = gon[5]
            }
            if (db == "Iepure [Mao]") {
                dis1 = gon[2]
                dis2 = ""
                dis3 = ""
            }
            if (db == "Dragon [Chen]") {
                dis1 = gon[5]
                dis2 = gon[2]
                dis3 = gon[0]
            }
            if (db == "Sarpe [Si]") {
                dis1 = gon[3]
                dis2 = gon[5]
                dis3 = gon[7]
            }
            if (db == "Cal [Wu]") {
                dis1 = gon[4]
                dis2 = gon[6]
                dis3 = ""
            }
            if (db == "Capra [Wei]") {
                dis1 = gon[6]
                dis2 = gon[4]
                dis3 = gon[2]
            }
            if (db == "Maimuta [Shen]") {
                dis1 = gon[7]
                dis2 = gon[9]
                dis3 = gon[5]
            }
            if (db == "Cocos [You]") {
                dis1 = gon[8]
                dis2 = ""
                dis3 = ""
            }
            if (db == "Caine [Xu]") {
                dis1 = gon[5]
                dis2 = gon[8]
                dis3 = gon[4]
            }
            if (mb == "Porc [Hai]") {
                mis1 = gon[9]
                mis2 = gon[1]
                mis3 = ""
            }
            if (mb == "Sobolan [Zi]") {
                mis1 = gon[0]
                mis2 = ""
                mis3 = ""
            }
            if (mb == "Bou [Chou]") {
                mis1 = gon[6]
                mis2 = gon[0]
                mis3 = gon[8]
            }
            if (mb == "Tigru [Yin]") {
                mis1 = gon[1]
                mis2 = gon[3]
                mis3 = gon[5]
            }
            if (mb == "Iepure [Mao]") {
                mis1 = gon[2]
                mis2 = ""
                mis3 = ""
            }
            if (mb == "Dragon [Chen]") {
                mis1 = gon[5]
                mis2 = gon[2]
                mis3 = gon[0]
            }
            if (mb == "Sarpe [Si]") {
                mis1 = gon[3]
                mis2 = gon[5]
                mis3 = gon[7]
            }
            if (mb == "Cal [Wu]") {
                mis1 = gon[4]
                mis2 = gon[6]
                mis3 = ""
            }
            if (mb == "Capra [Wei]") {
                mis1 = gon[6]
                mis2 = gon[4]
                mis3 = gon[2]
            }
            if (mb == "Maimuta [Shen]") {
                mis1 = gon[7]
                mis2 = gon[9]
                mis3 = gon[5]
            }
            if (mb == "Cocos [You]") {
                mis1 = gon[8]
                mis2 = ""
                mis3 = ""
            }
            if (mb == "Caine [Xu]") {
                mis1 = gon[5]
                mis2 = gon[8]
                mis3 = gon[4]
            }
            if (yb == "Porc [Hai]") {
                yis1 = gon[9]
                yis2 = gon[1]
                yis3 = ""
            }
            if (yb == "Sobolan [Zi]") {
                yis1 = gon[0]
                yis2 = ""
                yis3 = ""
            }
            if (yb == "Bou [Chou]") {
                yis1 = gon[6]
                yis2 = gon[0]
                yis3 = gon[8]
            }
            if (yb == "Tigru [Yin]") {
                yis1 = gon[1]
                yis2 = gon[3]
                yis3 = gon[5]
            }
            if (yb == "Iepure [Mao]") {
                yis1 = gon[2]
                yis2 = ""
                yis3 = ""
            }
            if (yb == "Dragon [Chen]") {
                yis1 = gon[5]
                yis2 = gon[2]
                yis3 = gon[0]
            }
            if (yb == "Sarpe [Si]") {
                yis1 = gon[3]
                yis2 = gon[5]
                yis3 = gon[7]
            }
            if (yb == "Cal [Wu]") {
                yis1 = gon[4]
                yis2 = gon[6]
                yis3 = ""
            }
            if (yb == "Capra [Wei]") {
                yis1 = gon[6]
                yis2 = gon[4]
                yis3 = gon[2]
            }
            if (yb == "Maimuta [Shen]") {
                yis1 = gon[7]
                yis2 = gon[9]
                yis3 = gon[5]
            }
            if (yb == "Cocos [You]") {
                yis1 = gon[8]
                yis2 = ""
                yis3 = ""
            }
            if (yb == "Caine [Xu]") {
                yis1 = gon[5]
                yis2 = gon[8]
                yis3 = gon[4]
            }
            lpb0 = lpb0 + FW
            if ((lpb0 > 12) || (lpb0 < 0)) {
                lpb0 = lpb0 - 12 * FW
            }
            lpb1 = ji[lpb0];
            lpb0 = lpb0 + FW
            if ((lpb0 > 12) || (lpb0 < 0)) {
                lpb0 = lpb0 - 12 * FW
            }
            lpb2 = ji[lpb0];
            lpb0 = lpb0 + FW
            if ((lpb0 > 12) || (lpb0 < 0)) {
                lpb0 = lpb0 - 12 * FW
            }
            lpb3 = ji[lpb0];
            lpb0 = lpb0 + FW
            if ((lpb0 > 12) || (lpb0 < 0)) {
                lpb0 = lpb0 - 12 * FW
            }
            lpb4 = ji[lpb0];
            lpb0 = lpb0 + FW
            if ((lpb0 > 12) || (lpb0 < 0)) {
                lpb0 = lpb0 - 12 * FW
            }
            lpb5 = ji[lpb0];
            lpb0 = lpb0 + FW
            if ((lpb0 > 12) || (lpb0 < 0)) {
                lpb0 = lpb0 - 12 * FW
            }
            lpb6 = ji[lpb0];
            lpb0 = lpb0 + FW
            if ((lpb0 > 12) || (lpb0 < 0)) {
                lpb0 = lpb0 - 12 * FW
            }
            lpb7 = ji[lpb0];
            lpb0 = lpb0 + FW
            if ((lpb0 > 12) || (lpb0 < 0)) {
                lpb0 = lpb0 - 12 * FW
            }
            lpb8 = ji[lpb0];
            lps0 = lps0 + FW
            if ((lps0 > 10) || (lps0 < 0)) {
                lps0 = lps0 - 10 * FW
            }
            lps1 = gon[lps0]
            lps0 = lps0 + FW
            if ((lps0 > 10) || (lps0 < 0)) {
                lps0 = lps0 - 10 * FW
            }
            lps2 = gon[lps0]
            lps0 = lps0 + FW
            if ((lps0 > 10) || (lps0 < 0)) {
                lps0 = lps0 - 10 * FW
            }
            lps3 = gon[lps0]
            lps0 = lps0 + FW
            if ((lps0 > 10) || (lps0 < 0)) {
                lps0 = lps0 - 10 * FW
            }
            lps4 = gon[lps0]
            lps0 = lps0 + FW
            if ((lps0 > 10) || (lps0 < 0)) {
                lps0 = lps0 - 10 * FW
            }
            lps5 = gon[lps0]
            lps0 = lps0 + FW
            if ((lps0 > 10) || (lps0 < 0)) {
                lps0 = lps0 - 10 * FW
            }
            lps6 = gon[lps0]
            lps0 = lps0 + FW
            if ((lps0 > 10) || (lps0 < 0)) {
                lps0 = lps0 - 10 * FW
            }
            lps7 = gon[lps0]
            lps0 = lps0 + FW
            if ((lps0 > 10) || (lps0 < 0)) {
                lps0 = lps0 - 10 * FW
            }
            lps8 = gon[lps0]

            Logger.log("An %s %s",ys, yb);
            Logger.log("Luna %s %s",ms, mb);
            Logger.log("Zi %s %s",ds, db);
            Logger.log("Ora %s %s",hs, hb);

            var result = {
                //year: {hs: ys, eb: yb},
                //month: {hs: ms, eb: mb},
                //day: {hs: ds, eb: db},
                //hour: {hs: hs, eb: hb},
                "An": new Binomial(ys, yb),
                "Luna": new Binomial(ms, mb),
                "Zi": new Binomial(ds, db),
                "Ora": new Binomial(hs, hb),
                comment1: str1,
                comment2: str2,
                'an start': LP
            };
            return result;
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
             form.lps1.value = lps1;
             form.lps2.value = lps2;
             form.lps3.value = lps3;
             form.lps4.value = lps4;
             form.lps5.value = lps5;
             form.lps6.value = lps6;
             form.lps7.value = lps7;
             form.lps8.value = lps8;
             form.lpb1.value = lpb1;
             form.lpb2.value = lpb2;
             form.lpb3.value = lpb3;
             form.lpb4.value = lpb4;
             form.lpb5.value = lpb5;
             form.lpb6.value = lpb6;
             form.lpb7.value = lpb7;
             form.lpb8.value = lpb8;*/
        }
    };
    return self;
};

function testCalculator(){
    var input = {
        date: '12/24/1948 1:20:00',
        sex: 'F',
        tz: 2,
        longitude: 28
    };
    var output = BaZiCalculatorFactory_bck(input).compute();
    //var output = BaZiCalculatorFactory(input);
    Logger.log(output.An.getCompressedVersion());
    Logger.log(output.Luna.getCompressedVersion());
    Logger.log(output.Zi.getCompressedVersion());
    Logger.log(output.Ora.getCompressedVersion());
    Logger.log(output['an start']);
};

function testCalculatorFromComponents(){
    var input = {
        date: {
            MM: 12,
            DD: 24,
            YY: 1948,
            HR: 1,
            MN: 20
        },
        sex: 'F',
        tz: 2,
        longitude: 28
    };
    var output = BaZiCalculatorFactory_bck(input).compute();
    //var output = BaZiCalculatorFactory(input);
    Logger.log(output.An.getCompressedVersion());
    Logger.log(output.Luna.getCompressedVersion());
    Logger.log(output.Zi.getCompressedVersion());
    Logger.log(output.Ora.getCompressedVersion());
    Logger.log(output['an start']);
};