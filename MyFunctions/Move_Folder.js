const fs = require('fs');
const W = require('./Write_Object_To_Disk');
const AF = require('../MyFunctions/ArchiveFolder');
const errorText = "errorText";
const errorCode = "errorCode";
const EM = require('../ErrorMessage/Error_Message');
const logger = require('../logger/logger');

exports.moveToError = (filename) => {
    fs.rename(PREF.QueueFolder + filename, PREF.ErrorsFolder + filename, (err) => { if (err) { logger.error(err); } });
}

exports.moveToArchive = (object) => {
    AF.ArchiveFolder(object);
    object.email[errorText] = Err_M.ERR_NOERROR.text;
    object.email[errorCode] = Err_M.ERR_NOERROR.code;
} 
// exports.updateXMLFile = (object, filename) =>
// {
//     if (object != null)
//         W.writeObjectToDisk(object, filename); 
//     insertMailEvent (object, filename, "Sending Failed");  
// }
