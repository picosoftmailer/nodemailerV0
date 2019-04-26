const fs = require('fs');
var mailerProperties = require('../mailerproperties/mailerProperties');
const router = app => {
    app.get('/sharedFiles', (req,res) => {
        var x = PREF.AttachmentFolder;
       res.send(getFolder(x))
    });
    app.get('/queue', (req,res) => {
        var x = PREF.QueueFolder;
        res.send(getFolder(x))
    });
    app.get('/attachments', (req,res) => {
        var x = PREF.AttachmentFile;
        res.send(getFolder(x))
    });
    app.get('/errors', (req,res) => {
        var x = PREF.ErrorsFolder;
        res.send(getFolder(x))
    });
    app.get('/template', (req,res) => {
        var x = PREF.TemplateFolder;
        res.send(getFolder(x))
    });



}
//************************************ 
//Function
function getFolder(path) {
    var R = { errorcode: 0, errorText: "", stack: "" };

    try {
        var T = [];

        fs.readdirSync(path).forEach(file => {
            var obj = {}
            var stats = fs.statSync(path + '\\' + file).size
            var date = fs.statSync(path + '\\' + file).atime.toLocaleDateString();
            obj["name"] = file;
            obj["size"] = stats;
            obj["date"] = date;
            T.push(obj);

        });
        R["data"] = T;
        R["total"] = T.length;

        return R;
    }
    catch (e) {
        R.errorText = e.message;
        R["stack"] = e.stack;
        R.errorcode = 1;
        return R;
    }

}
//**************************************************
// Export the router
module.exports = router;
//**************************************************

