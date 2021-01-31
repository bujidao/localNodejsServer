const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const port = 3000
const host = 'localhost'

app.use(bodyParser.urlencoded({ extended: false }))

// post 请求获取body参数
app.use(bodyParser.json())

require('./utils/logs')(app)

require('./utils/swagger')(app)

require('./routes/default')(app)
require('./routes/more')(app)
require('./routes/upload')(app)

app.listen(port, host, () => console.log(`Example app listening on port ${port}!`));
