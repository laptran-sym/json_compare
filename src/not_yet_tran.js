var fs = require('fs');
var frJson = require('../locales/fr/strings.json');

var not_yet_tran = (json) => {
    var rs = {};
    for (var key in json) {
        if (key === json[key]) {
            rs[key] = key;
        }
    }

    return rs;
}

var not_yet_tran_fr = not_yet_tran(frJson);
fs.writeFile('./out/not_yet_tran_fr.json', JSON.stringify(not_yet_tran_fr), err => {
    if (err) {
        console.log(err);
    }
});


module.exports = not_yet_tran;