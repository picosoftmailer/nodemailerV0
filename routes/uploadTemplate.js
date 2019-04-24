var mkdirp = require('mkdirp');
var multer = require('multer');
var mailerProperties = require('../mailerproperties/mailerProperties');
//creation un dossier Template
mkdirp(PREF.TemplateFolder + '\\Template', (err) => {
    if (err)
        return err;
});
var storage = multer.diskStorage({
    // preciser la destination
    destination: PREF.TemplateFolder + '\\Template',
    filename:  (req,file, cb) => {
        // sauf les fichiers avec .HTML
      
        if (!file.originalname.match(/\.(html)$/)) {
             var err = new Error();
            err.code = 'filetype';
             cb(err);
        } else {
            cb(null, file.originalname);
        }
    }
});
const upload = multer({ storage: storage });
const router = (app) => {
    app.post('/upload-template', upload.single('file'), (req,res) => {

        res.status(200).json({
            'msg': 'File uploaded successfully!', 'file': {
                'name': req.file.fieldname,
                'originalname ': req.file.originalname,
                'size': req.file.size,
                'mimetype': req.file.mimetype,
            }
        });
    });
}
//**************************************************
// Export the router
module.exports = router;
//**************************************************