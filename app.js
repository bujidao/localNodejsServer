const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const port = 3000

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

require('./utils/swagger')(app)

require('./routes/default')(app)
// require('./routes/upload')(app)
require('./routes/list')(app)
require('./routes/select')(app)

app.listen(port, () => console.log(`Example app listening on port ${port}!`));