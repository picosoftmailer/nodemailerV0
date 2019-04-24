// declaration des packages
var mailerProperties = require('../mailerproperties/mailerProperties');
var multer = require('multer');
var storage = multer.diskStorage({
// preciser la destination     
destination: PREF.AttachementFile,
filename: function(req,file,cb) {
    cb(null, file.originalname);
}
});

// importer le fichier
var upload= multer({storage: storage});
const router = (app) => {
    app.post('/upload-attachment', upload.single('file'),(req, res, next) => {
        res.status(200).json({
          msg: 'File uploaded successfully!', 'file' : {
           'name' : req.file.fieldname ,
           'originalname ' : req.file.originalname,
           'size' : req.file.size,
           'mimetype' : req.file.mimetype,
        }
      });
    });
}
//**************************************************
// Export the router
module.exports = router;
//**************************************************