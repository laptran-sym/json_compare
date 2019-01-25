var fs = require('fs');
var fr53Json = require('../locales/r53.fr/strings.json');
var fr54Json = require('../locales/r54.fr/strings.json');
var en54Json = require('../locales/r54.en/strings.json');

/**
 * Generate French strings.json file based on en54, fr53, fr54
 */
module.exports = filterKeys = function (fr53, fr54, en54) {
    var finalResult = {};
    var missingTranslationKeys = {}; // Keys not existed in fr53 and fr54
    var warningKeys = {}; // Keys not existed in fr53 but in fr54
    var redundantFR53Keys = {}; // Keys exist in fr53 but not in en54
    var redundantFR54Keys = {}; // Keys exist in fr54 but not in en54 and fr53

    console.log("Copying keys from EN54 and [FR53, FR54]!");
    for (var enKey in en54) {
        if (fr53.hasOwnProperty(enKey)) {
            finalResult[enKey] = fr53[enKey];
        } else if (fr54.hasOwnProperty(enKey)) {
            finalResult[enKey] = fr54[enKey];
            warningKeys[enKey] = fr54[enKey];
        } else {
            finalResult[enKey] = en54[enKey];
            missingTranslationKeys[enKey] = en54[enKey];
        }
    }

    console.log("Filter redundant FR53 keys!");
    for (var fr53Key in fr53) {
        if (!en54.hasOwnProperty(fr53Key)) {
            redundantFR53Keys[fr53Key] = fr53[fr53Key];
        }
    }

    console.log("Filter redundant FR54 keys!");
    for (var fr54Key in fr54) {
        if (!en54.hasOwnProperty(fr54Key) && !fr53.hasOwnProperty(fr54Key)) {
            redundantFR54Keys[fr54Key] = fr54[fr54Key];
        }
    }


    return {finalResult, missingTranslationKeys, warningKeys, redundantFR53Keys, redundantFR54Keys};
}

var rs = filterKeys(fr53Json, fr54Json, en54Json);

try {
    var fileName = "./out/should.fr54.strings.json";
    if(fs.existsSync(fileName)) fs.unlinkSync(fileName);

    fileName = "./out/missing.translation.keys.json";
    if(fs.existsSync(fileName)) fs.unlinkSync(fileName);

    fileName = "./out/warning.keys.json";
    if(fs.existsSync(fileName)) fs.unlinkSync(fileName);

    fileName = "./out/redundant.FR53.keys.json";
    if(fs.existsSync(fileName)) fs.unlinkSync(fileName);

    fileName = "./out/redundant.FR54.keys.json";
    if(fs.existsSync(fileName)) fs.unlinkSync(fileName);
} catch (err) {
    if (err) {
        console.error(err);
        throw err;
    }
}

try {
    fs.writeFileSync('./out/should.fr54.strings.json', JSON.stringify(rs.finalResult));
    fs.writeFileSync('./out/missing.translation.keys.json', JSON.stringify(rs.missingTranslationKeys));
    fs.writeFileSync('./out/warning.keys.json', JSON.stringify(rs.warningKeys));
    fs.writeFileSync('./out/redundant.FR53.keys.json', JSON.stringify(rs.redundantFR53Keys));
    fs.writeFileSync('./out/redundant.FR54.keys.json', JSON.stringify(rs.redundantFR54Keys));
} catch (err) {
    if (err) {
        console.error(err);
        throw err;
    }
}
