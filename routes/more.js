const express = require('express')
const router = express.Router()
const { successResult } = require('../utils/response')
const Mock = require('mockjs')
const Random = Mock.Random
const path = require('path')
const fs = require('fs')

module.exports = app => {
  /**
   * 获取列表
   * @route get /list
   * @group 更多测试接口
   */
  router.get('/list', function (req, res) {
    const data = Mock.mock({
      'list|1-50': [{
        id: '@id',
        name: '@cname',
        birth: '@date("yyyy-MM-dd")',
        gender: '@pick(["男", "女"])',
        title: '@pick(["主治医师", "副主治医师", "专家"])',
        party: '@pick(["中共党员", "群众"])',
        country: '@county(true)',
        phone: /[1][3578]\d{9}/,
        email: /\S{9}\@163\.com/,
        avatar: Random.image('300x400', '#50B347', '#FFF', '头像'),
        description: '@cparagraph(1, 3)'
      }]
    })
    data.total = data.list.length
    res.send(successResult(data))
  })

  
  /**
   * 省市区级联菜单，传入地区行政编码，返回这个地区管辖的地方，如果不传，直接返回省份列表。
   * 字段里面的hasChild表示是否是最后一层
   * @group 更多测试接口
   * @route get /select
   * @param { string } code.query 行政地区编码
   */
  router.get('/select', function (req, res) {
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
