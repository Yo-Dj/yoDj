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


let redirect_uri = 'http://localhost:8080/callback'
var whitelist = ['http://localhost:3000',
'https://accounts.spotify.com', 'https://yodj-8080.herokuapp.com']

const stripe = require('stripe')('sk_test_zIGU3JWicxTyRA0NydEELiqF00ztaNTI63');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
// (async () => {
  //   // Create a Customer:
const corsOptions = {
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}


app.use(express.static('public'))
.use(cors(corsOptions))
.use(cookieParser())
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Expose-Headers', 'Access-Control-*, Origin, X-Requested-With, Content-Type, Accept, Authorization')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type', 'Origin, X-Requested-With, Content-Type, Accept')
  res.setHeader('Access-Control-Allow-Credentials', true)
  next()
})
//   const customer = await stripe.customers.create({
//     source: 'tok_mastercard',
//     email: 'paying.user@example.com',
//   });

//   // Charge the Customer instead of the card:
//   const charge = await stripe.charges.create({
//     amount: 1000,
//     currency: 'usd',
//     customer: customer.id,
//   });

//   // YOUR CODE: Save the customer ID and other info in a database for later.

// })();

// (async () => {
//   // When it's time to charge the customer again, retrieve the customer ID.
//   const charge = await stripe.charges.create({
//     amount: 1500, // $15.00 this time
//     currency: 'usd',
//     customer: customer.id, // Previously stored, then retrieved
//   });
// })()

app.post('/save', async (req, res) => {
  let customer = {}
  try {
    customer = await stripe.customers.create({
      source: req.body.token.id,
      name: req.body.userInfo.name,
      description: `User ${req.body.userInfo.username} default payment`
    })
    console.log('CUSTOMER -----> ', customer)
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

// app.use(cors({
//   origin: function(origin, callback){
//     // allow requests with no origin
//     // (like mobile apps or curl requests)
//     if(!origin) return callback(null, true)
//     if(allowedOrigins.indexOf(origin) === -1){
//       var msg = 'The CORS policy for this site does not ' +
//                 'allow access from the specified Origin.'
//       return callback(new Error(msg), false)
//     }
//     return callback(null, true)
//   }
// }))

// var whitelist = ['https://accounts.spotify.com', 'http://localhost:3000']
// var corsOptions = {
//   origin: function (origin, callback) {
//     console.log('Origin ---> ', origin)
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// }


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
    // res.redirect(uri + '?access_token=' + access_token)
    res.redirect(uri)
    // res.send({...body})
  })
})

app.listen(PORT, '0.0.0.0', () => {
  console.log('Listening to PORT ---> ', PORT)
})

app.get('*', (req, res) => {
  res.sendFile(path.resolve('public/index.html'))
})




// var express = require('express')
// var cors = require('cors')
// var server = express()

// var whitelist = ['http://techiediaries.com', 'http://othersite.com', 'http://localhost:3000']

// var options = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// }

// server.use(function(req, res, next) {
//   // res.setHeader('Access-Control-Expose-Headers', 'Access-Control-*, Origin, X-Requested-With, Content-Type, Accept, Authorization')
//   // res.setHeader('Access-Control-Allow-Origin', '*')
//   // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
//   // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type', 'Origin, X-Requested-With, Content-Type, Accept')
//   // res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
//   // res.setHeader('Access-Control-Allow-Credentials', true)
//   res.header("Access-Control-Allow-Origin", "*")
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
//     // next();
//   next()
// })

// server.use(cors(options))

// // server.get('/login', function (req, res, next) {

// //   // res.json({msg: 'This has CORS enabled'})
// //   res.redirect('http://techiediaries.com')
// // })
// app.get('*', (req, res) => {
//   res.sendFile(path.resolve('public/index.html'))
// })

// server.listen(8080, () => {
//   console.log('Listenning at http://localhost:3000' )
// })
