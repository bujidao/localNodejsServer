/*
 * @Author       : Alex Ceng
 * @Date         : 2020-03-29 23:08:54
 * @LastEditors  : Alex Ceng
 * @LastEditTime : 2021-01-29 16:59:00
 */

module.exports = app => {
  const express = require('express')
  const router = express.Router()
  var multer = require('multer')
  var fs = require('fs');
  var images = require('images');
  var path = require("path")
  const { successResult } = require('../../models/result')

  var date = new Date()
  var y = date.getFullYear().toString()
  var m = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1).toString() : (date.getMonth() + 1).toString()
  var imageSavePath = 'upload/images/' + y + m

  var imageStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      // 接收到文件后输出的保存路径（若不存在则需要创建）
      cb(null, imageSavePath);
    },
    filename: function (req, file, cb) {
      // 将保存文件名设置为 时间戳 ，比如 1585495060327.jpg
      cb(null, Date.now() + "." + file.originalname.split('.').pop());
    }
  });

  const createFolder = (folder) => {
    try {
      // 测试 path 指定的文件或目录的用户权限,我们用来检测文件是否存在
      fs.accessSync(folder);
    } catch (e) {
      // 文件夹不存在，以同步的方式创建文件目录。
      fs.mkdirSync(folder);
    }
  };
  createFolder(imageSavePath);

  /**
   * 添加水印
   * @param {*} sourceUrl 源地址
   * @param {*} targetUrl 目标保存地址
   * @param {*} cb 
   */
  const addWaterMark = (sourceUrl, targetUrl, cb) => {
    let sourceImg = images(sourceUrl)
    let waterMarkImg = images(path.join(__dirname, 'waterMarks.png'))
    let wW = waterMarkImg.width()
    let wH = waterMarkImg.height()
    let tarUrl = targetUrl
    sourceImg
      .draw(waterMarkImg, 0, 0)
      .draw(waterMarkImg, wW * 1, 0)
      .draw(waterMarkImg, wW * 2, 0)
      .draw(waterMarkImg, wW * 3, 0)
      .draw(waterMarkImg, wW * 4, 0)
      .draw(waterMarkImg, 0 + wW * 0.5, wH * 1)
      .draw(waterMarkImg, wW * 1 + wW * 0.5, wH * 1)
      .draw(waterMarkImg, wW * 2 + wW * 0.5, wH * 1)
      .draw(waterMarkImg, wW * 3 + wW * 0.5, wH * 1)
      .draw(waterMarkImg, wW * 4 + wW * 0.5, wH * 1)
      .draw(waterMarkImg, 0, wH * 2)
      .draw(waterMarkImg, wW * 1, wH * 2)
      .draw(waterMarkImg, wW * 2, wH * 2)
      .draw(waterMarkImg, wW * 3, wH * 2)
      .draw(waterMarkImg, wW * 4, wH * 2)
      .draw(waterMarkImg, 0 + wW * 0.5, wH * 3)
      .draw(waterMarkImg, wW * 1 + wW * 0.5, wH * 3)
      .draw(waterMarkImg, wW * 2 + wW * 0.5, wH * 3)
      .draw(waterMarkImg, wW * 3 + wW * 0.5, wH * 3)
      .draw(waterMarkImg, wW * 4 + wW * 0.5, wH * 3)
      .save(tarUrl, {
        quality: 30
      });
      cb()
  }

  var imageUpload = multer({ storage: imageStorage });

  router.post('/image', imageUpload.single('image'), (req, res, next) => {
    var file = req.file;
    // 接收文件成功后返回数据给前端
    const imgPath = file.path.replace(/\\/g, '/')
    if (req.body.addWaterMask && req.body.addWaterMask === 'no') {
      successResult(res, '', imgPath)
    } else {
      // addWaterMark(path.join(__dirname, '../../' + imgPath), path.join(__dirname, '../../' + imgPath), () => {
      //   successResult(res, '', imgPath)
      // })
      successResult(res, '', imgPath)
    }
  })

  app.use('/upload', router)
}
