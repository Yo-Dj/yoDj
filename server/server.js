const express = require('express')
const path = require('path')
let querystring = require('querystring')
let request = require('request')
var cors = require('cors')
var cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const {SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET} = require('./SpotifyKeys.js')
const PORT = process.env.PORT || 8080
const app = express()
const {requestReceivedMessage, rejectMessage, acceptMessage} = require('./library')
require('dotenv').config()

let redirect_uri = 'http://localhost:8080/callback'
var whitelist = ['http://localhost:3000',
'https://accounts.spotify.com', 'https://yodj-8080.herokuapp.com', 'http://localhost:8080', 'http://localhost:8080/profile']

const client = require('twilio')(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
)
const stripe = require('stripe')(process.env.STRIPE_KEY);
stripe.applePayDomains.create({
  domain_name: 'localhost:8080'
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))


const corsOptions = {
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      console.log('Origin ---> ', origin)
      callback(new Error('Not allowed by CORS'))
    }
  }
}


app.use(express.static('public'))
// .use(cors(corsOptions))
.use(cookieParser())
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Expose-Headers', 'Access-Control-*, Origin, X-Requested-With, Content-Type, Accept, Authorization')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type', 'Origin, X-Requested-With, Content-Type, Accept')
  res.setHeader('Access-Control-Allow-Credentials', true)
  next()
})

app.get('/.well-known/apple-developer-merchantid-domain-association', function(req, res) {
  res.sendFile(__dirname + '/apple-developer-merchantid-domain-association')
})

app.post('/api/messages', (req, res, next) => {
  let {userPhone, requestInfo, requestType} = req.body
  let messageText = requestType === 'reject' ? rejectMessage(requestInfo) : requestType === 'accept' ? acceptMessage(requestInfo) : requestReceivedMessage()
  client.messages
    .create({
      from: process.env.TWILIO_PHONE,
      to: userPhone,
      body: messageText
    })
    .then(() => {
      res.send(JSON.stringify({success: true}))
    })
    .catch(error => {
      console.log('Messages Error ---> ', error)
      res.send(JSON.stringify({success: false}))
    })
})

app.post('/save', async (req, res) => {
  let customer = {}
  try {
    customer = await stripe.customers.create({
      source: req.body.token.id,
      name: req.body.userInfo.name,
      description: `User ${req.body.userInfo.username} default payment`
    })
    res.json(customer)
  }
  catch(e) {
    console.log('ERR ----> ', e)
    next(e)
  }
})

app.get('/card', async (req, res) => {
  try {
    const customer = await stripe.customers.retrieve(req.query.cardId)
    res.json(customer)
  } catch(e) {
    console.log("Error -----> ", e)
    next(e)
  }
})

app.post('/upgrade-card', async (req, res) => {
  try {
    const customer = await stripe.customers.update(req.body.userId, {
      source: req.body.token.id
    })
    res.json(customer)
  } catch(e) {
    console.log('Upgrade Card Err --> ', e)
  }
})

app.post('/pay', async (req, res) => {
  try {
    let intent = await stripe.paymentIntents.create({
      customer: req.body.stripeAccount,
      amount: req.body.tipAmount, 
      payment_method: req.body.cardId,
      currency: 'usd',
      confirmation_method: 'manual'
    })
    res.json(intent)
  } catch(e) {
    console.log('ERROR PAy -----> ', e.message)
    return response.send({ error: e.message})
  }
})

app.post('/pay-confirm', async (req, res) => {
  try {
    //cus_Ghi2tCJwQM8VsD
    // let mainPaymentIntent = await stripe.paymentIntents.retrieve(req.body.intentId)
    // console.log('PAYMENT INTENT INFO ----> ', mainPaymentIntent)
    stripe.paymentIntents.confirm(req.body.intentId)
    .then(paymentIntent => {
      console.log('PAYMENT INTEN CONFIRM ----> ', paymentIntent)
      res.json(paymentIntent)
    })
    .catch(e => console.log('CONFIRM ERR ---> ', e))
  } catch(e) {
    console.log('CONFIRM ERR ---> ', e)
    return response.send({ error: e.message})
  }
})

app.get('/login', (req, res) => {
  console.log('CLIENT ID ----> ', SPOTIFY_CLIENT_ID)
  console.log('SPOTIFY CLIENT SECRET -----> ', SPOTIFY_CLIENT_SECRET)
  // let test =   querystring.stringify({
  //   response_type: 'code',
  //   client_id: SPOTIFY_CLIENT_ID,
  //   scope: 'user-read-private user-read-email',
  //   redirect_uri
  // })
  // console.log('Test ----> ', test)
  // console.log('Redirect UI ----> ', redirect_uri)

  // res.redirect('https://accounts.spotify.com/authorize?' +
  // querystring.stringify({
  //   response_type: 'code',
  //   client_id: SPOTIFY_CLIENT_ID,
  //   scope: 'user-read-private user-read-email',
  //   redirect_uri
  // }))

  // res.redirect('http://google.com')
  // res.send({hello: 'Hello WOrld'})
  // console.log('After QUering ')
})

app.get('/callback', (req, res) => {
  let code = req.query.code || null
  console.log('Callback is invoked ---> ', req.body)
  let authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code: code,
      redirect_uri,
      grant_type: 'authorization_code'
    },
    headers: {
      'Authorization': 'Basic ' + (new Buffer(
        SPOTIFY_CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET
      ).toString('base64'))
    },
    json: true
  }
  request.post(authOptions, function(error, response, body) {
    var access_token = body.access_token
    let uri = process.env.FRONTEND_URI || 'http://localhost:3000'
    res.redirect(uri)
  })
})

app.listen(PORT, '0.0.0.0', () => {
  console.log('Listening to PORT ---> ', PORT)
})

app.get('*', (req, res) => {
  res.sendFile(path.resolve('public/index.html'))
})
