// 載入 express 並建構應用程式伺服器
const express = require('express')
const app = express()
const exphbs = require('express-handlebars');
// const router = express.Router()
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
// const bcrypt = require('bcryptjs')
const passport = require('./config/passport')
const session = require('express-session')
const flash = require('connect-flash')

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const PORT = process.env.PORT



app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs', helpers: require('./config/helpers') }))
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({ limit: '50mb' }))
app.use(methodOverride('_method'))
app.use(express.static('public'))
app.use(session({
    secret: 'ThisIsMySecret',
    resave: false,
    saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
app.use((req, res, next) => {
    // 你可以在這裡 console.log(req.user) 等資訊來觀察
    res.locals.user = req.user
    res.locals.success_messages = req.flash('success_messages')
    res.locals.error_messages = req.flash('error_messages')
    next()
})



// 設定 port 3000
app.listen(PORT, () => {
    console.log(`App is running on http://localhost:${PORT}`)
})


require('./routes')(app)

module.exports = app