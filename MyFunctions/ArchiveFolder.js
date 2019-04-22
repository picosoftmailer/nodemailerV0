
const mailerProperties = require('../mailerproperties/mailerProperties');
const logger = require('../logger/logger');
var fs = require('fs');
//***************************************
// The Function
exports.ArchiveFolder = (object) => {
    logger.trace("Moving To Archive");
    // All Var
    var moment = require('moment');
    var js2xmlparser = require("js2xmlparser");
    var mkdirp = require('mkdirp');
    var objXml;
    var month = new moment().month() + 1;
    var day = new moment().date();
    var year = new moment().year();
    var Millisecond = new moment().millisecond();
    var second = new moment().second();
    var minute = new moment().minute();
    var hour = new moment().hour();
    var T = "HHmmssSS";
    var D = "YYYYMMDD";
    var XML_ROOT_NAME = "email";
    var Time_Folder_Archive = new moment().format(T);
    var Date_Folder_Archive = new moment().format(D);
    var Archive_Date = PREF.ArchiveFolder + `${Date_Folder_Archive}`;
    var Archive_Time = PREF.ArchiveFolder + `${Date_Folder_Archive}\\${Time_Folder_Archive}` + object.email.filename.slice(0, -4) + '\\';
    var Archive_Save_New_XML_File = PREF.ArchiveFolder + `${Date_Folder_Archive}\\${Time_Folder_Archive}` + object.email.filename;
    //---------------------------------------------
    objXml = js2xmlparser.parse(XML_ROOT_NAME, object.email);
    //-------------------------------------------
    mkdirp(PREF.ArchiveFolder, (err) => {
        if (err) { logger.error(err); }
        mkdirp(Archive_Date, (err) => {
            if (err) { logger.error(err); }
            mkdirp(Archive_Time, (err) => {
                if (err) { logger.error(err); }
                fs.writeFile(Archive_Save_New_XML_File, objXml, (err) => {
                    if (err) { logger.error(err); }
                    fs.unlink(PREF.QueueFolder + object.email.filename, (err) => {
                        if (err) { logger.error(err); }
                    });
                    if (object.email.attachmentfile != null) {

                        object.email.attachmentfile.forEach((i) => {
                            fs.rename(PREF.AttachmentFile + i, Archive_Time + i, (err) => {
                                if (err) { logger.error(err) }
                            });
                        });
                    }
                });
            });
        });
    });
    logger.trace("Moved To Archive");
}
// The End of Function
//*************************************************


