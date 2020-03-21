const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");

// certificates from auth0
const https = require('https');
const fs = require('fs');

const key = fs.readFileSync('./localhost-key.pem');
const cert = fs.readFileSync('./localhost.pem');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// link to database
const uri = process.env.ATLAS_URI;

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

const connection = mongoose.connection; 

connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
})

// loading routers from other files 
const destinationsRouter = require('./routes/destinations');
const usersRouter = require('./routes/users');

// adding routers as middleware 
app.use('/destinations', destinationsRouter);
app.use('/users', usersRouter);

/** auth0 API calls */
// set up auth0 configuration
const authConfig = {
    domain: "dev-0anjj2er.auth0.com", 
    audience: "https://dev-0anjj2er.auth0.com/api/v2/"
}

// define middleware that validates incoming bearer tokens
// using JWKS from dev-oanjj2er.auth0.com
const checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true, 
        rateLimit: true, 
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`
    }), 

    audience: authConfig.audience,
    issuer: `https://${authConfig.domain}/`,
    algorithm: ["RS256"]
});

// defines an endpoint that must be called with an access token
app.get("/api/external", checkJwt, (req ,res) => {
    res.send({
        msg: "Your access token was successfully validated!"
    });
});

/** 
 * this code gonna be for certification, mkcert, that kinda thing 
 * : )
 */
const { auth } = require("express-openid-connect");

// who knows if this will work 
const clientSecret = process.env.CLIENT_SECRET;

const appSessionSecret = process.env.APP_SECRET;

const config = {
    required: false, 
    auth0Logout: true, 
    baseURL: "http://localhost:3000",
    issuerBaseURL: "https://dev-0anjj2er.auth0.com",
    clientID: clientSecret,
    appSessionSecret: appSessionSecret
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided form the auth router 
app.get("/", (req,res) => {
    res.send(req.isAuthenticated() ? "Logged in" : "Logged out");
});


// var request = requre("request");

// var options = { method: POST, 
//     url: "https://dev-0anjj2er.auth0.com/oauth/token",
//     headers: { 'content-type': 'applicatoin/json' }, 
//     body: '{"client_id":"Nye1Ijo0IA8fAQ4SXINaoq2owdY3h5u2","client_secret":"98vdE-KSSYOHatwJqk_tV8Jj9ROkYSxMOd4vMgTltsbfBiuOAgu8amXpdKexEMd9","audience":"https://dev-0anjj2er.auth0.com/api/v2/","grant_type":"client_credentials"}' 
// };

// request(options, function(error, response, body) {
//     if (error) throw new Error(error);

//     console.log(body);
// });

// intercepting all calls to API
// app.use('/api', express_jwt({secret: SECRET, userProperty: 'token_payload'}));

// app.post('/api/v2/users/google-oauth2|116658177472204313093',
//     check_scopes(['update:users', 'update:users_app_metadata']),
//     function(req, res, next) {
//         // idk what to do here 
// });

// function check_scopes(scopes) {
//     return function(req, res, next) {
//         // checks if scopes are defined in the token
//         var token = req.token_payload;
//         for (var i =0; i<token.scopes.length; i++){
//             for (var j=0; j<scopes.length; j++){
//                 if(scopes[j] === token.scopes[i]) return next();
//             }
//           }

//         return res.send(401, 'insufficient scopes');
//     }
// }


// app.listen(port, () => {
//     console.log(`Server is running on port: ${port}`);
// });
https.createServer({key, cert}, app).listen('3000', () => {
    console.log('Listening on http://localhost:3000');
});