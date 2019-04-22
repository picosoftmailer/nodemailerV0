const g = require('./get');
const EMAIL = "email";
const logger = require('../logger/logger');
const EM = require('../ErrorMessage/Error_Message');
const pool = require('../database/config');

var FILENAME = "filename", FROM = "from", TO = "to", CC = "cc", BCC = "bcc", SUBJECT = "subject",
    TEXT = "text", HTML = "templatefile", ATTACHMENTS = "attachments", SENDER = "sender", REPLYTO = "replyTo",
    INREPLYTO = "inReplyTo", REFERENCES = "references", ENVELOPE = "envelope", ATTACHDATAURLS = "attachDataUrls",
    WATCHHTML = "watHtml", ICALEVENT = "icalEvent", ALTERNATIVES = "alternatives", ENCODING = "encoding",
    RAW = "raw", TEXTENCODING = "textEncoding", PRIORITY = "priority", HEADERS = "headers", MESSAGEID = "messageId", LIST = "list",
    ERRORTEXT = "errorText", ERRORCODE = "errorCode", ACCEPTED = "accepted", REJECTED = "rejected", PENDING = "pending", RESPONSE = "response";


exports.InsertMailEvent = (object) => {


    sql = "INSERT INTO customers" +
        "(Filename,TheSender,SendTo,Cc,Bcc,MessageId,Subject,Text,Html,Attachments,Sender,ReplyTo,InReplyTo,TheReferences,Envelope," +
        "AttachDataUrls,WatchHtml,IcalEvent,Alternatives,Encoding,Raw,TextEncoding,Priority,Headers,List,ErrorText,ErrorCode,Accepted,Rejected,"
        + "pending,response) VALUES ?";




    values = [
        [g.getMailProp(object, FILENAME), g.getMailProp(object, FROM), g.getMailProp(object, TO), g.getMailProp(object, CC),
        g.getMailProp(object, BCC), g.getMailProp(object, MESSAGEID), g.getMailProp(object, SUBJECT), g.getMailProp(object, TEXT),
        g.getMailProp(object, HTML), g.getMailProp(object, ATTACHMENTS), g.getMailProp(object, SENDER), g.getMailProp(object, REPLYTO),
        g.getMailProp(object, INREPLYTO), g.getMailProp(object, REFERENCES), g.getMailProp(object, ENVELOPE),
        g.getMailProp(object, ATTACHDATAURLS), g.getMailProp(object, WATCHHTML), g.getMailProp(object, ICALEVENT),
        g.getMailProp(object, ALTERNATIVES), g.getMailProp(object, ENCODING), g.getMailProp(object, RAW), g.getMailProp(object, TEXTENCODING),
        g.getMailProp(object, PRIORITY), g.getMailProp(object, HEADERS), g.getMailProp(object, LIST), g.getMailProp(object, ERRORTEXT),
        g.getMailProp(object, ERRORCODE), g.getMailProp(object, ACCEPTED), g.getMailProp(object, REJECTED), g.getMailProp(object, PENDING),
        g.getMailProp(object, RESPONSE)
        ]
    ];




    pool.query(sql, [values], (err) => {

        if (err) {
            logger.error('database' + err);
        } else {
            logger.trace("Done");
        }
    });
}; //end 