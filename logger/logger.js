var log4js = require('log4js');
const mailerProperties = require('../mailerproperties/mailerProperties');


var FileLogger =  {
  type: 'file',
  filename: PREF.LOG_FILE
};

var consoleLogger =  {
  type: 'stdout'
};



if (PREF.LOG_METHOD == 'consolefile')

  log4js.configure({
    appenders: {
      PSLogger: FileLogger,
      out: consoleLogger
    },

    categories: {
      default: {
        appenders: ['PSLogger', 'out'],
        level: PREF.LOG_LEVEL
      }
    }

  });
else if (PREF.LOG_METHOD == 'file')

  log4js.configure({
    appenders: {
      PSLogger: FileLogger,
    },

    categories: {
      default: {
        appenders: ['PSLogger'],
        level: PREF.LOG_LEVEL
      }
    }

  });
else

  log4js.configure({
    appenders: {
      out: consoleLogger
    },

    categories: {
      default: {
        appenders: ['out'],
        level: PREF.LOG_LEVEL
      }
    }

  });

//   if (PREF.LOG_METHOD == 'consolefile')
//     log4js.configure({
//         appenders: {
//         out:c,
//         app:{ type: 'file', filename: PREF.LOG_FILE }
//         },
//         categories: {
//         default: { appenders: [ 'out', 'app' ], level: PREF.LOG_LEVEL }
//         }
//         });
// else if (PREF.LOG_METHOD == 'file')
//     log4js.configure({
//         appenders: {
//         app:{ type: 'file', filename: PREF.LOG_FILE }
//         },
//         categories: {
//         default: { appenders: ['app' ], level: PREF.LOG_LEVEL }
//         }
//         });
// else
//     log4js.configure({
//         appenders: {
//         out:{ type: 'console' }
//         },
//         categories: {
//         default: { appenders: [ 'out' ], level: PREF.LOG_LEVEL }
//         }
//         });



module.exports = log4js.getLogger('PSLogger');



