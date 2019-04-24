// declaration des packages
var js2xmlparser = require("js2xmlparser");
var mkdirp = require('mkdirp');
var fs = require('fs');
var mailerProperties = require('../mailerproperties/mailerProperties');

exports.createMail = (req, res) => {

 // creation des paramètres du fichier XML (en JSON)
    var obj = {};
    var From = req.query.From;
    obj.From = From;
    var SendTo = req.query.SendTo;
    obj.SendTo = SendTo;
    var CC = req.query.CC;
    obj.CC = CC;
    var BCC = req.query.BCC;
    obj.BCC = BCC;
    var Subject = req.query.Subject;
    obj.Subject = Subject;
    var TemplateFile = req.query.TemplateFile;
    obj.TemplateFile = TemplateFile;
    var filename = req.query.filename;
    obj.filename = filename;
    var AttachmentFile = req.query.AttachmentFile;
    obj.AttachmentFile = AttachmentFile;
//Conversion de JSON vers XML
    let objXml = js2xmlparser.parse("email", obj);

    // ecrire dans le contenu de l'xml
        fs.writeFile( PREF.QueueFolder + obj.filename , objXml, function (err) {
            if (err) {
                return err;
            }
        });
    res.status(200).json({'msg': 'File created successfully!' ,  obj });


}