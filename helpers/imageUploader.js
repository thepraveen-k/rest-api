const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({

    destination: function (req,file,cb){

        cb (null, './uploads')
    },

    filename: function (req,file,cb){

        cb(null, new Data().getTime() + path.extname(file.originalname))
    }
})




//this helps to user can only upload image

const fileFilter = (req,file,cb) => {

    if(file.mimeType === 'image/jpeg' || file.mimeType === 'image/png'){

    cb(null, true)
    
    } else {
        
        cb(new Error ('Unsupported Files'), false)
    }
}

//end



const upload = multer({

    storage : storage,
    limits: {
        filesize: 1024*1024*10
    },
    fileFilter:fileFilter
})


module.exports = {

    upload : upload
}