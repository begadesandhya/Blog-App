const path = require('path');
const multer = require('multer');

const Storage = multer.diskStorage({
    destination: function(req, res, cb){
        cb(null, 'public/uploads')
    },
    filename:(req, file, cb) =>{
        let ext = path.extname(file.originalname)
        cb(null, Date.now() + ext);
    },
    
});


const upload = multer({
    storage:Storage,
    fileFilter: function (req, file, callback) {
        if(
            file.mimetype === 'image/jpeg' ||
            file.mimetype === 'image/png'
        ){
            callback(null, true)
        }else{
            console.log('only jpeg and png');
            callback(null, false)
        }
    }
}).single('titleImage')

module.exports = upload