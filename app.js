const express = require('express')
const mongoose = require('mongoose')
const db = mongoose.connection
const app = express()
const port = 3000


if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

// db status
db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})


app.get('/', (req, res) => {
  res.send('hi!')
})

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})