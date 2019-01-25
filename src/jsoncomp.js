var fs = require('fs');
var frJson = require('../locales/fr/strings.json');
var enJson = require('../locales/en/strings.json');

/**
 * Find the missed key of enJson in frJson
 * 
 * @param {*} enJson 
 * @param {*} frJson 
 */
var jsoncomp = function (enJson, frJson) {
    var result = {};

    for (var i1 in enJson) {
        var key1 = i1;
        var val1 = enJson[key1];

        if (!frJson.hasOwnProperty(key1)) {
           result[key1] = val1;
        }
    }

    return result;
}

var rs_en_fr = jsoncomp(enJson, frJson);
var rs_fr_en = jsoncomp(frJson, enJson);

fs.writeFile('./out/en_fr.json', JSON.stringify(rs_en_fr), err => {
    console.log(err);
});

fs.writeFile('./out/fr_en.json', JSON.stringify(rs_fr_en), err => {
    console.log(err);
});

/**
 * Make a new json with the key from enJson, the value from frJson (if that key is existed in frJson)
 * The order of keys as in enJson
 * 
 * @param {*} enJson 
 * @param {*} frJson 
 */
var copyjson = function (enJson, frJson) {
    var result = {};

    for (var i1 in enJson) {
        var key1 = i1;

        if (frJson.hasOwnProperty(key1)) {
           result[key1] = frJson[key1];
            // result[key1] = "Co value";
        } else {
           result[key1] = enJson[key1];
        }
    }

    return result;
}

fs.writeFile('./out/copied.string.fr.json', 
    JSON.stringify(copyjson(enJson, frJson)), err => {
    console.log(err);
});

module.exports = jsoncomp;