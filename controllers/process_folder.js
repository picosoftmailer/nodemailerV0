const PF = require('./process_file');
const fs = require('fs');
const mailerProperties = require('../mailerproperties/mailerProperties');
const logger = require('../logger/logger');
const XML = 'xml';
const MF = require('../MyFunctions/Move_Folder');
//********************** */
exports.ProcessFolder = (dir) => {
    logger.trace('Entering  Queue Folder');
    try {
        fs.readdirSync(dir).forEach((filename) => {
            //****  folder.xml*/
            if (fs.lstatSync(PREF.QueueFolder + filename).isDirectory()) {
                MF.moveToError(filename);
            }
            //****case normal */        
            else if (filename.split('.').pop() == XML) {
                PF.ProcessFile(filename);
            }
            else {
                //**** folder.txt .... */    
                MF.moveToError(filename);
            }
        });
    }
    catch (e) { logger.fatal('Problem in ProcessFolder ' + e); }
}
//************************** */