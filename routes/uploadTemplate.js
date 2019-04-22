// declaration des packages
const express = require('express');
const router = express.Router();
const uploadTemplateController = require('../controllers/uploadTemplateController');
var mkdirp = require('mkdirp');
var multer = require('multer');
var mailerProperties = require('../mailerproperties/mailerProperties');
//creation un dossier Template
mkdirp(PREF.TemplateFolder+ '\\Template', function(err) {
    
    
});
var storage = multer.diskStorage({
    // preciser la destination
    destination: PREF.TemplateFolder + '\\Template',
    filename: function(req,file,cb) {
        // sauf les fichiers avec .HTML
        if(!file.originalname.match(/\.(html)$/)){
            var err = new Error();
            err.code = 'filetype';
            return cb(err);
        }else{
            cb(null,file.originalname );
        }
 
    }
    });
    var upload= multer({storage: storage});


router.post('/upload-template', upload.single('file'), uploadTemplateController.getTemplate);

module.exports = router;