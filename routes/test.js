module.exports = app => {
  const express = require('express')
  const router = express.Router()

  app.get('/select', function (req, res) {
    const dataDir = 'E:\\workbench\\coding\\int\\pkscli\\json\\select.json'
    let data = fs.readFileSync(dataDir, 'utf-8')
    data = JSON.parse(data)
    res.send(successRes(data))
  })

  app.post('/update', function (req, res) {
    let data = JSON.stringify(req.body, null, 2)
    fs.writeFileSync(dataDir, data)
    res.send(successRes('更新成功'))
  })

  const sheng = [{
    label: '四川',
    id: '001',
    hasChildren: true
  }, {
    label: '重庆',
    id: '002',
    hasChildren: true
  }]
  const shixian = {
    '001': [{
      label: '成都',
      id: 's001',
      hasChildren: true
    }, {
      label: '绵阳',
      id: 's002',
      hasChildren: false
    }],
    '002': [{
      label: '沙坪坝',
      id: 'c001',
      hasChildren: true
    }, {
      label: '大足',
      id: 'c002',
      hasChildren: false
    }],
    's001': [{
      label: '锦江区',
      id: 'qs001',
      hasChildren: false
    }, {
      label: '武侯区',
      id: 'qs002',
      hasChildren: false
    }],
    'c001': [{
      label: '111',
      id: 'qs001',
      hasChildren: false
    }, {
      label: '222',
      id: 'qs002',
      hasChildren: false
    }]
  }
  app.get('/optlist', function (req, res) {
    let data = []
    console.log(req)
    if (!req.query.id) {
      data = sheng
    } else {
      data = shixian[req.query.id]
    }
    res.send(successRes(data))
  })

  app.use('/test', router)
}