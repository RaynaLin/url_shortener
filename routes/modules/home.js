const express = require('express')
const router = express.Router()
const Url = require('../../models/urls')
const randomUrl = require('../../randomNum')

router.get('/', (req, res) => {
  res.render('index')
})

// create
router.post('/', (req, res) => {
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
router.get('/:shortURL', (req, res) => {
  const shortURL = req.params.shortURL
  Url.findOne({ short: shortURL })
    .then(data => {
      if (!data) {
        return res.render('error', {
          ErrorMsg: "Can't found the URL:",
          ErrorURL: req.headers.host + "/" + shortURL
        })
      }

      res.redirect(data.origin)
    })
    .catch(err => console.log(err))
})

module.exports = router