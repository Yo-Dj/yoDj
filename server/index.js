const express = require('express')
const path = require('path')
const port = process.env.PORT || 3000
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static('public'))
app.get('*', (req, res) => {
  res.sendFile(path.resolve('public/index.html'))
})

app.listen(port, () => {
  console.log('Listening to port -> ', port)
})
