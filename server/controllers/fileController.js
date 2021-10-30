var { upload } = require('../middleware/upload-middleware');

var uploadImg = function(req, res, next) {
    try {
        
        upload(req, res, function(err) {
            if(err) {

                res.status(400).json({"error": err})
                // if (err instanceof multer.MulterError) {
                //     // A Multer error occurred when uploading.
                //     res.send(err).status(400)
                // } else if (err) {
                //     // An unknown error occurred when uploading.
                //     res.send(err).status(400)
                // }
            
            }else {
                console.log(req.file)
                // Everything went fine.
                res.send('Successfully uploaded')
            }

        })

    }catch(err) {
        next(err);
        res.status(400).json({error: true, msg: err})
    }

}

module.exports = {uploadImg}