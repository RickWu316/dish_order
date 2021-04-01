// 載入 express 並建構應用程式伺服器
const express = require('express')
const app = express()
const exphbs = require('express-handlebars');
const router = express.Router()
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const bcrypt = require('bcryptjs')

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const PORT = process.env.PORT



app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({ limit: '50mb' }))
app.use(methodOverride('_method'))
app.use(express.static('public'))




// 設定 port 3000
app.listen(PORT, () => {
    console.log(`App is running on http://localhost:${PORT}`)
})


require('./routes')(app)

module.exports = app