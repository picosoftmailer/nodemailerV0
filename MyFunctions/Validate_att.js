const EM = require('../ErrorMessage/Error_Message');
const logger = require('../logger/logger');

exports.isValid = (object, filename) => {
    const EMAIL = "email";
    const EMAIL_FROM_LABEL = "from";
    const EMAIL_SENDTO_LABEL = "to";
    const EMAIL_CC_LABEL = "cc";
    const EMAIL_BCC_LABEL = "bcc";
    const FILENAME = "filename";
    const ERR_TEXT = "errorText";
    const ERR_CODE = "errorCode";

    if ((object.hasOwnProperty(EMAIL)) == false) {
        logger.trace(Err_M.ERR_EMAIL);
        object.email = {}
        object.email[ERR_TEXT] = Err_M.ERR_EMAIL.text;
        object.email[ERR_CODE] = Err_M.ERR_EMAIL.code;
        return false;
    }


    if (object.email.hasOwnProperty(EMAIL_FROM_LABEL) == false) {
        logger.trace(Err_M.ERR_FROM);
        object.email[ERR_TEXT] = Err_M.ERR_FROM.text;
        object.email[ERR_CODE] = Err_M.ERR_FROM.code;
        return false;
    }


    if (((object.email.hasOwnProperty(EMAIL_SENDTO_LABEL)) ||
        (object.email.hasOwnProperty(EMAIL_CC_LABEL)) ||
        (object.email.hasOwnProperty(EMAIL_BCC_LABEL))) == false) {
        logger.trace(Err_M.ERR_MAIL_DEST_EMPTY);
        object.email[ERR_TEXT] = Err_M.ERR_MAIL_DEST_EMPTY.text;
        object.email[ERR_CODE] = Err_M.ERR_MAIL_DEST_EMPTY.code;
        return false;
    }

    // //****************************************** */// Times   

    // // if ((object.email.hasOwnProperty(EMAIL_TIMES_LABEL)) == false || (object.email[EMAIL_TIMES_LABEL] == ''))
    // //     object.email[EMAIL_TIMES_LABEL] = 0;
    // // //    a retour 

    // // if (object.email[EMAIL_TIMES_LABEL] >= PREF.MAX_TIMES) 
    // // {
    // //     object.email[EMAIL_PSM_ERROR] = Err_M.ERR_MAX_TIMES_REACHED; 
    // //     object.email[EMAIL_PSM_LASTRUN] = new moment().format(DATE); 
    // //     //object.email[EMAIL_PSM_NEXTXMLDEST] = moveToErrorFolder;
    // //     return Err_M.ERR_MAX_TIMES_REACHED + PREF.MAX_TIMES;
    // // }
    // //***************************************** *///
    object.email[FILENAME] = filename;
    return true;
}