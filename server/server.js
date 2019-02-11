const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 3000
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static('public'))
app.listen(PORT, () => {
  console.log('Listening to port -> ', PORT)
})


app.get('*', (req, res) => {
  console.log('It finds home url')
  res.sendFile(path.resolve('public/index.html'))
})

