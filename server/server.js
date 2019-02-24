const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 8080
const app = express()

app.use(express.static('public'))
app.listen(PORT, '0.0.0.0', () => {
  console.log('Listening to PORT ---> ', PORT)
})

app.get('*', (req, res) => {
  res.sendFile(path.resolve('public/index.html'))
})
