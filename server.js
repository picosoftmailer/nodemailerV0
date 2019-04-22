const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const cron = require("node-cron");
const crone = require ('./controllers/process_cron')
const uploadTemplateRoutes = require('./routes/uploadTemplate');
const uploadAttachmentRoutes = require('./routes/uploadAttachment');
const createXmlMailRoutes = require('./routes/createXmlMail');
const dbRoutes =require('./routes/db');
const app = express();


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

app.use(dbRoutes);
app.use(uploadTemplateRoutes);
app.use(uploadAttachmentRoutes);
app.use(createXmlMailRoutes);
app.set('view engine', 'ejs');
app.listen(3200, '127.0.0.1' , crone.ProcessCron());