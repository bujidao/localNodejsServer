const express = require('express')
const router = express.Router()
const path = require('path')
const fs = require('fs')
const { successResult } = require('../utils/response')

module.exports = app => {

  /**
   * 下拉选择
   * @group 更多测试
   * @route get /address
   * @param { string } code.query 行政地区编码
   */
  app.get('/address', function (req, res) {
    const dataDir = path.join(__dirname, '../mock/address.json')
    let mockData = fs.readFileSync(dataDir, 'utf-8')
    mockData = JSON.parse(mockData)
    let data = []
    if (!req.query.code) {
      data = mockData.province
    } else {
      data = mockData[req.query.code]
    }
    res.send(successResult(data))
  })

  app.use('/', router)
}