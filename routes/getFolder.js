const fs = require('fs');
var mailerProperties = require('../mailerproperties/mailerProperties');
const router = app => {
    app.get('/getSharedFiles', (request, response) => {
        var r =[] 
        var x = PREF.AttachmentFolder;
        getFolder(r,x)
        response.send(r)
       
    });
    app.get('/queue', (request, response) => {
        var r =[] 
        var x = PREF.QueueFolder;
        getFolder(r,x)
        response.send(r) 
    });
    app.get('/attachments', (request, response) => {
        var r =[] 
        var x = PREF.AttachmentFile;
        getFolder(r,x)
        response.send(r) 
    });

}
//************************************ 
//Function
function getFolder(T,path) {
     
    fs.readdirSync(path).forEach(file => {
        var obj = {}
        var stats = fs.statSync(path + '\\' + file).size
        var date = fs.statSync(path + '\\' + file).atime.toLocaleDateString()
        obj["name"] = file;
        obj["size"] = stats;
        obj["date"] = date;
        T.push(obj);
        return T
    });
}
//**************************************************
// Export the router
module.exports = router;
//**************************************************

