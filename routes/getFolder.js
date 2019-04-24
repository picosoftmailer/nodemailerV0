const fs = require('fs');
var mailerProperties = require('../mailerproperties/mailerProperties');
const router = app => {
    app.get('/getSharedFiles', (res) => {
        var x = PREF.AttachmentFolder;
        res.send(getFolder(x))
    });
    app.get('/queue', (res) => {
        var x = PREF.QueueFolder;
        res.send(getFolder(x))
    });
    app.get('/attachments', (res) => {
        var x = PREF.AttachmentFile;
        res.send(getFolder(x))
    });
    app.get('/Errors', (res) => {
        var x = PREF.ErrorsFolder;
        res.send(getFolder(x))
    });
    app.get('/Template', (res) => {
        var x = PREF.TemplateFolder;
        res.send(getFolder(x))
    });
    app.get('/Archive', (res) => {
        var x = PREF.ArchiveFolder;
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

