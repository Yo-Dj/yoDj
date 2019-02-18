const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 8080
const app = express()

console.log('env port is', process.env.PORT)

app.use(express.static(path.join(__dirname, 'public')))
app.listen(PORT, '0.0.0.0', () => {
  console.log('Listening to PORT ---> ', PORT)
})
