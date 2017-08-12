const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const expressValidator = require('express-validator')
//flash messaging
const flash = require('connect-flash')
const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
//database
const mongo = require('mongodb')
const mongoose = require('mongoose')
mongoose.connect('mongodb://ausite_admin:auadminpass@ds139327.mlab.com:39327/heroku_33xdh4l2')

const app = express()
const port = process.env.PORT ? process.env.PORT : 3000

//route paths
const index = require('./routes/index')
const admin = require('./routes/admin')
const roster = require('./routes/roster')

app.set('views', path.join(__dirname, 'views'))
//default layout file will be called 'main'
app.engine('handlebars', exphbs({defaultLayout:'main'}))
app.set('view engine', 'handlebars')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser())

//set static folder
app.use(express.static(path.join(__dirname, 'public')))

app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(expressValidator({
    errorFormatter: (param, msg, value) => {
        var namespace = param.split('.')
        , root = namespace.shift()
        , formParam = root
        
        while(namespace.length) {
            formParam += '[' + namespace.shift() + ']'
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        }
    }
}))

app.use(flash())

app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error')
    res.locals.user = req.user || null
    next()
})

//use route paths
app.use('/', index)
app.use('/ausite_admin', admin)
app.use('/roster', roster)

app.listen(port || 5000, () => {
    console.log(`Server started on port ${port}.`)
})