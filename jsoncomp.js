var fs = require('fs');
var frJson = require('./string.fr.json');
var enJson = require('./string.en.json');
var outJs = {};

/**
 * Find the missed key of json1 in json2
 * 
 * @param {*} json1 
 * @param {*} json2 
 */
var jsoncomp = function (json1, json2) {
    var result = {};

    for (var i1 in json1) {
        var key1 = i1;
        var val1 = json1[key1];

        if (!json2.hasOwnProperty(key1)) {
           result[key1] = val1;
        }
    }

    return result;
}

var rs_en_fr = jsoncomp(enJson, frJson);
var rs_fr_en = jsoncomp(frJson, enJson);

fs.writeFile('./json.comp/en_fr.json', JSON.stringify(rs_en_fr), err => {
    console.log(err);
});

fs.writeFile('./json.comp/fr_en.json', JSON.stringify(rs_fr_en), err => {
    console.log(err);
});

/**
 * Make a new json with the key from json1, the value from json2 (if that key is existed in json2)
 * The order of keys as in json1
 * 
 * @param {*} json1 
 * @param {*} json2 
 */
var copyjson = function (json1, json2) {
    var result = {};

    for (var i1 in json1) {
        var key1 = i1;

        if (json2.hasOwnProperty(key1)) {
           result[key1] = json2[key1];
        }
    }

    return result;
}

fs.writeFile('./json.comp/copied.string.fr.json', 
    JSON.stringify(copyjson(enJson, frJson)), err => {
    console.log(err);
});

module.exports = jsoncomp;