const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const crone = require ('./controllers/process_cron')
const app = express();
const createXmlMailRoutes = require('./routes/createXmlMail');
const uploadAttachmentRoutes = require('./routes/uploadAttachment');
const uploadTemplateRoutes = require('./routes/uploadTemplate');
const WebServicegetFolder = require ('C:\\Users\\ayoub.bellaj\\Desktop\\nodemailerV0\\routes\\getFolder.js')
const WebServicegriddb= require ('C:\\Users\\ayoub.bellaj\\Desktop\\nodemailerV0\\routes\\griddb.js');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin,X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT,POST,PATH,GET,DELETE');
        return res.status(200).json({});
    }
    next();
});
createXmlMailRoutes(app);
uploadTemplateRoutes(app);
uploadAttachmentRoutes(app);
WebServicegetFolder(app);
WebServicegriddb(app);
app.set('view engine', 'ejs');
app.listen(3200, '127.0.0.1' , crone.ProcessCron());
