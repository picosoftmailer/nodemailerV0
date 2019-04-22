const ejs = require('ejs');
const nodemailer = require('nodemailer');
const path = require('path');
const mailerProperties = require('../mailerproperties/mailerProperties');
const EM = require('../ErrorMessage/Error_Message');
const MF = require('../MyFunctions/Move_Folder');
const DB = require('../MyFunctions/database');
const fs = require('fs');
const logger = require('../logger/logger');
const messageId = "messageId";
const envelope = "envelope";
const accepted = "accepted";
const rejected = "rejected";
const pending = "pending";
const response = "response";
const ERR_TEXT = "errorText";
const ERR_CODE = "errorCode";
var transporter ;

// function verifySMTP(err, success)  {
//     if (err) {
//         logger.error(err);
//         return;
//     } else {
//         console.log("Server is ready to take our messages");
//     }
// };



exports.sendMail = (object) => {
    var emailAttachments = [];
    var emailHTMLContent = '';
    var valid = true;
    var mailOptions = {};
    logger.trace('entering send mail');
    logger.trace('checking attachmentfile');
    emailAttachments = [];
    if (object.email.attachmentfile != null) {
        object.email.attachmentfile.forEach((i) => {
            if (fs.existsSync(PREF.AttachmentFile + i)) {
                emailAttachments.push({ path: (PREF.AttachmentFile + i), filename: path.basename(PREF.AttachmentFile + i) })
            }
            else {
                logger.error(i + Err_M.ERR_ATTACHMENTNAME);
                MF.moveToError(object.email.filename);
                object.email[ERR_TEXT] = i + Err_M.ERR_ATTACHMENTNAME.text;
                object.email[ERR_CODE] =  Err_M.ERR_ATTACHMENTNAME.code;
                DB.InsertMailEvent(object);
                valid = false;
            }
        });
    }
    if (valid == false) return;
    logger.trace('checking sharedfile');
    if (object.email.sharedfile != null) {
        object.email.sharedfile.forEach((i) => {
            if (fs.existsSync(PREF.AttachmentFolder + i)) {
                emailAttachments.push({ path: (PREF.AttachmentFolder + i), filename: path.basename(PREF.AttachmentFolder + i) })
            } else {
                logger.error(i + Err_M.ERR_SHAREDNAME);
                MF.moveToError(object.email.filename);
                object.email[ERR_TEXT] = i + Err_M.ERR_SHAREDNAME.text;
                object.email[ERR_CODE] =  Err_M.ERR_SHAREDNAME.code;
                DB.InsertMailEvent(object);
                valid = false;
    
            }
        });
    }
    if (valid == false) return;
    //********************************************
    logger.trace('checking templatefile');
    if (object.email.templatefile != null) {
        try {
            html = fs.readFileSync(PREF.TemplateFolder + object.email.templatefile, 'utf8');
            emailHTMLContent = ejs.render(html, object.email);
        } catch (error) {
            logger.error(object.email.templatefile + Err_M.ERR_TEMPLATENAME);
            MF.moveToError(object.email.filename);
            object.email[ERR_TEXT] = object.email.templatefile + Err_M.ERR_TEMPLATENAME.text;
            object.email[ERR_CODE] = Err_M.ERR_TEMPLATENAME.code;
            DB.InsertMailEvent(object);
            valid = false;
            return;
        }
    }
    //*****************************************
    // if (object.email.Times >= PREF.MAX_TIMES) {
    //     fs.rename(PREF.QueueFolder + filename, PREF.ErrorsFolder + filename, (err) => {
    //         if (err) { logger.error(err); }
    //     });
    // }
    // ++object.email.Times;
    //********************************************
    var mailItems = ["from", "to", "cc", "bcc", "subject", "text", "attachments", "html", "sender", "replyTo",
        "inReplyTo", "references", "watchHtml", "icalEvent", "priority", "headers", "alternatives", "envelope",
        "messageID", "date", "encoding", "raw ", "textEncoding", "list", "disableFileAccess", "disableUrlAccess"];
    for (var i = 0; i < mailItems.length; i++) {
        if (object.email.hasOwnProperty(mailItems[i])) { mailOptions[mailItems[i]] = object.email[mailItems[i]]; }
        if (mailItems[i] == "attachments") { mailOptions[mailItems[i]] = emailAttachments; }
        if (mailItems[i] == "html") { mailOptions[mailItems[i]] = emailHTMLContent; }
    }
    logger.trace('mailoptions pushed');

    //********************************************
    logger.trace('creating transporter');


    // if (PREF.SMTP_AUTH == false)
    //     transporter = nodemailer.createTransport({
    //         host: PREF.SMTP_HOST,
    //         port: PREF.SMTP_PORT,
    //     });
    // else
        transporter = nodemailer.createTransport({
            host: PREF.SMTP_HOST,
            port: PREF.SMTP_PORT,

        });

    
    //********************************************
    //verify connection configuration
    // transporter.verify((err, success) => {
    //     if (err) {
    //         logger.error(err);
    //         return;
    //     } else {
    //         console.log("Server is ready to take our messages");
    //     }
    // });
    //*******************************************************


    logger.trace("..sendMail SMTP connection established with " + PREF.SMTP_HOST + " on port " + PREF.SMTP_PORT);
    logger.trace("sending mail");
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            logger.error("problem while sending mail : " + err);
            object.email.errorText = err.message;
            object.email.errorCode = err.responseCode;
            
            DB.InsertMailEvent(object);
        }
        else {
            logger.trace("email sent ");
            object.email.errorCode = 0;
            object.email[messageId] = info.messageId;
            object.email[envelope] = info.envelope;
            object.email[accepted] = info.accepted;
            object.email[rejected] = info.rejected;
            object.email[pending] = info.pending;
            object.email[response] = info.response;
            MF.moveToArchive(object);
            DB.InsertMailEvent(object);
        }
    });
    //********************************************
    transporter.close();
}


