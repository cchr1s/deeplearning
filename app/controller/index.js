const express = require('express')
const router = express.Router()
const multer = require('multer')
const fs = require('fs')
var exec = require('child_process').exec

const index = (req, res) => {
    res.render('index', {
        title: '首页'
    })
}

var storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, './public/upload')
    },
    filename: function (req, file, cb){
        cb(null, file.originalname)
    }
})
var upload = multer({
    storage: storage
})

function execute(){
    exec('python ../../../tools/demo.py --img '+imgname[0]+' ', function(err, stdout,stdout){
        if(err) console.log(err)
        //console.log(imgname[0])
        console.log(stdout)
    })
}
var imgname = []

var files = fs.readdirSync(__dirname.substring(0, 45) + 'public')

module.exports = (router) => {
    router.get('/', index)
    router.post('/upload', upload.single('file'), function (req, res, next) {
        imgname.unshift(req.file.originalname)
        var url = 'http://' + req.headers.host + '/upload/' + req.file.originalname
        res.json({
            code : 200,
            data : url
        })
    })

    router.post('/data', function(req, res, next){ 
        if(files.indexOf('result.jpg') > -1){
            fs.unlinkSync(__dirname.substring(0, 45) + 'public/result.jpg')
        }

        if(req.body.execute){
            execute()
        }
    })
} 