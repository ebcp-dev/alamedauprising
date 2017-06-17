const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')

const app = express()
const port = process.env.PORT ? process.env.PORT : 3000

//route paths
const index = require('./routes/index')

app.set('views', path.join(__dirname, 'views'))
//default layout file will be called 'main'
app.engine('handlebars', exphbs({defaultLayout:'main'}))
app.set('view engine', 'handlebars')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

//set static folder
app.use(express.static(path.join(__dirname, 'public')))

//use route paths
app.use('/', index)

app.listen(port || 5000, () => {
    console.log(`Server started on port ${port}.`)
})