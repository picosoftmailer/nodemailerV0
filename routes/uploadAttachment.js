// declaration des packages
const express = require('express');
var mailerProperties = require('../mailerproperties/mailerProperties');
const router = express.Router();
const uploadAttachmentController = require('../controllers/uploadAttachmentController');
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

router.post('/upload-attachment', upload.single('file'), uploadAttachmentController.getAttachment);
//**************************************************
// Export the router
module.exports = router;
//**************************************************