const fs = require('fs')
const path = require('path')
const express = require('express')
const router = express.Router()
var images = require("images")
var multer = require('multer')
const { successResult } = require('../utils/response')

module.exports = app => {
  var date = new Date()
  var y = date.getFullYear().toString()
  var m = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1).toString() : (date.getMonth() + 1).toString()
  var imageSavePath = path.join(__dirname, '../upload/images/' + y + m)

  // const imageStorage = multer.diskStorage({
  //   destination: function (req, file, cb) {
  //     cb(null, imageSavePath);
  //   },
  //   filename: function (req, file, cb) {
  //     cb(null, Date.now() + "." + file.originalname.split('.').pop());
  //   }
  // })

  const createFolder = (folder) => {
    try {
      fs.accessSync(folder);
    } catch (e) {
      fs.mkdirSync(folder);
      console.log('有文件夹')
    }
  };
  createFolder(imageSavePath);

  // var imageUpload = multer({ storage: imageStorage });


/**
 * 图片上传
 * @route post /upload/image
 * @group 文件上传
 * @returns {object} 200 - get参数返回信息
 * @returns {Error}  default - Unexpected error
 */
  app.post('/image', function (req, res) {
    res.send(successResult(''))
  })

  // router.post('/image', imageUpload.single('image'), (req, res, next) => {
  //   var file = req.file;
  //   // 接收文件成功后返回数据给前端
  //   const imgPath = file.path.replace(/\\/g, '/')
  //   if (req.body.addWaterMask && req.body.addWaterMask === 'no') {
  //     successResult(res, '', imgPath)
  //   } else {
  //     // addWaterMark(path.join(__dirname, '../../' + imgPath), path.join(__dirname, '../../' + imgPath), () => {
  //     //   successResult(res, '', imgPath)
  //     // })
  //     successResult(res, '', imgPath)
  //   }
  // })

  app.use('/upload', router)
}
