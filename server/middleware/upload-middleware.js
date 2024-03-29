var multer = require('multer');
const maxSize = 2 * 1024 * 1024; // for 2MB

var upload = multer({
    storage: multer.diskStorage({
                destination: function (req, file, cb) {
                    cb(null, './gallery')
                },
                filename: function (req, file, cb) {
                    const ext = file.originalname.split('.')[1];
                    cb(null, `${req.body.name}.${ext}`) // OR file.originalname
                }
            }),
    fileFilter: function(req, file, cb) {
                const mimeType = file.mimetype.toLowerCase();
                if (mimeType == "image/png" || mimeType == "image/jpg" || mimeType == "image/jpeg") {
                    cb(null, true);
                } else {
                    cb('Only .png, .jpg and .jpeg format allowed!', false);
                }
            },
    limits: { fileSize: maxSize }
}).single('image')


module.exports = upload