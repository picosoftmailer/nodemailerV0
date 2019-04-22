var js2xmlparser = require("js2xmlparser");
var XML_ROOT_NAME="email";
var fs = require('fs');
var logger = require('../logger/logger');
var xmlData;
exports.writeObjectToDisk = (object, filename) => {

    xmlData = js2xmlparser.parse(XML_ROOT_NAME, object.email);

    fs.writeFile(PREF.QueueFolder + filename,xmlData ,(err) => {

        if (err) {logger.error('Problem while writing xml' + err);}
        
    });
}