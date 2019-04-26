const logger = require('../logger/logger');
const cron = require("node-cron");
const path = require('path');
const dir = path.join(__dirname, '..', '/data/Queue');
const PF =  require('./process_folder');
const mailerProperties = require('../mailerproperties/mailerProperties');


exports.ProcessCron = () => {
 logger.trace('Entering Cron');
    try {   
        cron.schedule(PREF.YourCron, () => {
       // PF.ProcessFolder(dir);
        });
    }
    catch (e) { logger.fatal('Problem in ProccessCron ' + e); } 
}
