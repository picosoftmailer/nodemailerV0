

PREF = {

    TemplateFolder: 'C:\\Users\\ayoub.bellaj\\Desktop\\nodemailerV0\\data\\Template\\',
    AttachmentFolder: 'C:\\Users\\ayoub.bellaj\\Desktop\\nodemailerV0\\data\\SharedAtt\\',
    QueueFolder: 'C:\\Users\\ayoub.bellaj\\Desktop\\nodemailerV0\\data\\Queue\\',
    ErrorsFolder: 'C:\\Users\\ayoub.bellaj\\Desktop\\nodemailerV0\\data\\Errors\\',
    AttachmentFile: 'C:\\Users\\ayoub.bellaj\\Desktop\\nodemailerV0\\data\\Att\\',
    ArchiveFolder: `C:\\Users\\ayoub.bellaj\\Desktop\\nodemailerV0\\data\\Archive\\`,

    SMTP_HOST: 'mail.picosoft.biz',
    SMTP_PORT: 25,
    SMTP_Auth : false,
    SMTP_USERNAME: "alibaba",
    SMTP_PASSWORD: "123456",

    LOG_LEVEL: 'error',
    LOG_FILE: 'logger/logs/site.log',
    LOG_METHOD: 'consolefile',
    YourCron: '*/5 * * * * *',
    MAX_TIMES:5

};


// function validatePred () 
// {
//     if (typeof PREF == 'undefined') {
//         logger.fatal ("");
//         return false;
//     } else return true;

// }




/*  LOG_LEVEL
OFF	    nothing is logged
FATAL	fatal errors are logged
ERROR	errors are logged
WARN	warnings are logged
INFO	infos are logged
DEBUG	debug infos are logged
TRACE	traces are logged
ALL	    everything is logged
*/

/* LOG_METHOD : It logs in console and file, or in file, else in console

consolefile : console and file
file  : file only

*/



