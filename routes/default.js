const fs = require('fs')
const path = require('path')
const express = require('express')
const router = express.Router()
const { successResult } = require('../utils/response')

module.exports = app => {

/**
 * get 请求测试
 * @route GET /get
 * @param {string} name.query
 * @param {string} age.query
 * @returns {object} 200 - get参数返回信息
 * @returns {Error}  default - Unexpected error
 */
  app.get('/get', function (req, res) {
    const data = {
      params: req.query,
      method: req.method,
      host: req.headers.host,
      'user-agent': req.headers['user-agent']
    }
    res.send(successResult(data))
  })

/**
 * @typedef PostParams
 * @property {string} name - 姓名
 * @property {integer} age - 年龄
 */

/**
 * post 请求测试
 * @route post /post
 * @param {PostParams.model} data.body - the new point
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 */
  app.post('/post', function (req, res) {
    console.log(req.body)
    const data = {
      params: req.body,
      method: req.method,
      host: req.headers.host,
      'user-agent': req.headers['user-agent']
    }
    res.send(successResult(data))
  })

  app.use('/', router)
}
