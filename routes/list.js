const express = require('express')
const router = express.Router()
const { successResult } = require('../utils/response')
const Mock = require('mockjs')
const Random = Mock.Random

module.exports = app => {
  /**
   * 获取列表
   * @route get /list
   * @group 列表
   */
  app.get('/list', function (req, res) {
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

  app.use('/', router)
}
