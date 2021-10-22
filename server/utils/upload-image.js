const multer = require('multer');
const upload = multer({ dest: "gallery/" });

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "gallery")
    },
    filename: function(req, file, cb) {
        const ext = file.mimetype.split("/")[1];
        cb(null, `${file.filename}-${Date.now()}.${ext}`);
    }
})