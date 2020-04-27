'use strict';

// get the packages we need
const fs = require('fs'), // use to handle file I/O opreations
  express = require('express'), //use to define framework
  expressValidator = require('express-validator'),
  app = express(), //taking express object for whole project
  bodyParser = require('body-parser'), //it is use to handle post reuqests
  morgan = require('morgan'), //use morgan to for development env
  cors = require('cors'),
  utils = require('./util/customFunctions'), // used custom function
  util = new utils(),
  config = require('./config/config'),
  constants = require('./config/appConstants');
  global.fetch = require('node-fetch');

const env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const https = require("https");

app.set('superSecret', constants.Secret); // secret variable
// ====================================
// Route need to allow cross origin
// ====================================
const CorsOptions = {
    origin: '*',//config.OriginWhiteList,
    credentials: true
  };
  app.use(cors(CorsOptions));
  
// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({
    extended: false
  }));
  
  //enabling bodyparser to accept json also
  app.use(bodyParser.json({
    limit: '50mb',
    type: 'application/json'
  }));
  
  //express validator setting
  app.use(expressValidator());
  
  // use morgan to log requests to the console
  app.use(morgan('dev'));


//set default language
app.use(function (req, res, next) {

    let language = req.params.language || req.headers['language'];

    if (language) {
      if (config.lang.avail_lang[req.headers.language]) {
        app.set('lang', language);
      } else {
        app.set('lang', 'en');
      }
    } else {
      // global.lng='en';
      app.set('lang', 'en');
    }
    next();
  });

//Route Start

//adding route for home page
app.get('/', function (req, res) {
    res.send(
      '<center><h2><b>Hi, This is CrownStack Server.<br><i> How can i help you ;)</i></b></h2></center>'
    );
  });

  //create custom headers to aa our custom headers
function customHeaders(req, res, next) {
  // OR set your own header here
  res.setHeader('x-mycure-App-Version', 'v1.0.0');
  //res.header("Content-Type", "application/json");
  res.header("Accept", "application/json, text/plain,*/*");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization,Access-Control-Allow-Origin,Access-Control-Allow-Methods,access-token,authorization,client_secret");

  next();
}

//adding customHeaders function in middleware 
app.use(customHeaders);

app.use(express.static(__dirname + '/public'));

//Adding route for docs 
app.get('/docs', function (req, res) {
  app.use(express.static(__dirname + '/public/docs'));
  
  res.sendFile('./public/docs/index.html', { root: __dirname });
});

//define common api and require routes based file
let crownStackService = require('./routes/routes');
//adding middleware for api
app.use('/crownStackService', crownStackService);




app.use(function(req, res, next){
  const langMsg = config.Msg[req.app.get("lang")];
  util.makeJsonResponse(res, false, config.Constant.APIResCode.NotFound, util.formatException(langMsg.routeNotAllowed.replace('<<<url>>>',req.url)), null);  
  return;
});  

// catch errors and save as file in log folder
process
.on('uncaughtException', function (err) {
  const stack = err.stack;
  const timeout = 1;
  
})
.on('unhandledRejection', (reason, p) => {
  console.error(reason, 'Unhandled Rejection at Promise', p);
});

const port = process.env.PORT || 4000;
app.listen(port, function() {
  console.log('Listening on ' + port);
})