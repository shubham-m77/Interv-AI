const multer = require("multer");

const multerUpload = multer({
    storage:multer.memoryStorage(),
    limits:{
        fileSize: 3* 1024 * 1024 // 3MB
    },
    
});

module.exports = multerUpload;