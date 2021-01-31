const express = require('express')
const router = express.Router()
var images = require("images")
var multer = require('multer')
const { successResult } = require('../utils/response')
const { accessFolder } = require('../utils/index')

module.exports = app => {

  /**
   * 创建图片保存保存路径
   */
  const createSavePath = () => {
    var date = new Date()
    var y = date.getFullYear().toString()
    var m = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1).toString() : (date.getMonth() + 1).toString()
    var imageSavePath = 'upload/images/' + y + m
    accessFolder(imageSavePath);
    return imageSavePath
  }

  /**
   * 图片压缩
   */
  const tinyImage = (src) => {
    images(src).save(src, {
      quality: 60
    })
  }

  const imageSavePath = createSavePath()

  /**
   * 图片保存容器
   */
  const imageStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, imageSavePath);
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "." + file.originalname.split('.').pop());
    }
  })

  /**
   * 上传限制
   */
  const imageLimits = {
    fileSize: 5 * 1024 * 1024
  }

  var imageUpload = multer({
    storage: imageStorage,
    limits: imageLimits
  });

/**
 * 图片上传
 * @route post /upload/image
 * @group 文件上传
 * @consumes multipart/form-data
 * @param {file} image.formData.required 图片大小不要超过5M
 * @returns {object} 200 - get参数返回信息
 * @returns {Error}  default - Unexpected error
 */
  router.post('/image', imageUpload.single('image'), (req, res, next) => {
    var file = req.file
    tinyImage(file.path)
    const imgPath = file.path.replace(/\\/g, '/')
    const imgAccessPath = imgPath.replace('upload', 'static')
    const data= {
      ...file,
      accessPath: imgAccessPath,
      accessFullPath: 'http://localhost:3000/' + imgAccessPath
    }
    res.send(successResult(data))
  })

  // 静态文件代理
  app.use('/static', express.static('upload'))

  app.use('/upload', router)
}
