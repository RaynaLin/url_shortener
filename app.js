// 可以新增back to index的功能
// 還未做create錯誤程式碼
// 還未做shortener URL，error.hbs
// 美化

const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const Url = require('./models/urls')
const randomUrl = require('./randomNum')
const bodyParser = require('body-parser')
const db = mongoose.connection
const app = express()
const port = 3000


if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true }))

// db status
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})


app.get('/', (req, res) => {
  res.render('index')
})

// create
app.post('/', (req, res) => {
  if (!req.body.url) return res.redirect("/")
  const shortURL = randomUrl(5)

  Url.findOne({ origin: req.body.url })
    .lean()
    .then(data => {
      if (!data) {
        return Url.create({ origin: req.body.url, short: shortURL })
      }
      return data
    })
    .then(data => {
      res.render('success', { shortURL: data.short })
    })
    .catch(err => console.log(err))
})


// shortener URL
app.get('/:shortURL', (req, res) => {
  const shortURL = req.params.shortURL
  Url.findOne({ short: shortURL })
    .then(data => {
      res.redirect(data.origin)
    })
    .catch(err => console.log(err))
})


app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})