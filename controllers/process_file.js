const fs = require('fs');
const sendmail = require('./sendMail');
const mailerProperties = require('../mailerproperties/mailerProperties');
const logger = require('../logger/logger');
const validate_att = require('../MyFunctions/Validate_att');
const MF = require('../MyFunctions/Move_Folder');
const DB = require('../MyFunctions/database');
const FILENAME = "filename";
const xml2js = require('xml2js');
var parser = new xml2js.Parser();
/************************* */
exports.ProcessFile = (filename) => {

    logger.trace('entering ProcessFile');
    fs.readFile(PREF.QueueFolder + filename, (err, data) => {
        if (err) { logger.error('ProcessFile error while reading file'); }
        parser.parseString(data, (err, xmlObj) => {

            if (err) {
                logger.error('xml not correct');
                MF.moveToError(filename);
                return;
            }


            if (xmlObj == undefined) {
                xmlObj = {}
                xmlObj.email = {}
                xmlObj.email[FILENAME] = filename;
                MF.moveToError(filename);
                xmlObj.email.errorText = Err_M.ERR_INVALID_XML.text;
                xmlObj.email.errorCode = Err_M.ERR_INVALID_XML.code;
                DB.InsertMailEvent(xmlObj);
                return;

            }
            var isValid = validate_att.isValid(xmlObj, filename);

            if (isValid == false) {

                xmlObj.email[FILENAME] = filename;
                MF.moveToError(filename);
                DB.InsertMailEvent(xmlObj);
                return;
            }
            sendmail.sendMail(xmlObj);
        });
    })
}
/************************* */

