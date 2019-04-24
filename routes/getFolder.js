const fs = require('fs');

const router = app => {
    app.get('/getSharedFiles', (request, response) => {
        var r =[] 
        var x = 'C:\\Users\\ayoub.bellaj\\Desktop\\nodemailerV0\\data\\SharedAtt'
        getFolder(r,x)
        response.send(r)
       
    });
    app.get('/queue', (request, response) => {
        var r =[] 
        var x = 'C:\\Users\\ayoub.bellaj\\Desktop\\nodemailerV0\\data\\Queue'
        getFolder(r,x)
        response.send(r) 
    });
    app.get('/attachments', (request, response) => {
        var r =[] 
        var x = 'C:\\Users\\ayoub.bellaj\\Desktop\\nodemailerV0\\data\\Att'
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

