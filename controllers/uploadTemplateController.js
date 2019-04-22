exports.getTemplate = (req, res, next) => {

    
    res.status(200).json({'msg': 'File uploaded successfully!', 'file' : {
        'name' : req.file.fieldname ,
        'originalname ' : req.file.originalname,
        'size' : req.file.size,
        'mimetype' : req.file.mimetype,
     }
    });

    


}