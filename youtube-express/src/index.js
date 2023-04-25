const express = require('express'); //imports the express library(foundation)
const session = require('express-session')
//this aids saving a session to DB
const MongoStore =require('connect-mongo')
const passport = require('passport')
//this hold passport validation process
require('./strategies/local')
//routes
const groceriesRoute = require('./routes/groceries'); // importing the groceries route
const marketsRoutes = require('./routes/markets'); // importing the markets route
const authRoutes = require('./routes/auth');

//DB connection
require('./database');

const app = express(); //gives us an instance of express app
const bodyParser = require('body-parser');
const PORT = 5000;

//middleware are function invoked in between the call and response of a request
// app.use(express.json()) //activates the ability to parse json request body, its depreciated
// app.use(express.urlencoded()) //activates the ability to parse url encoded request body, its depreciated
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json({extended: false}))
//cookie-parser, to read cookie in request
//sessions-parser, to read session
app.use(session({
    secret:'hshdhdyeyuehheururjrjrjr', //used to encrypt and decrypt session data
    resave: false,
    saveUninitialized: false,
    //working with connect-mongo above
    //it saves session to DB and even when the server is restarted existing session are still working
    //removing the need to relogin
    store : MongoStore.create({
        mongoUrl: 'mongodb://127.0.0.1:27017/youtube-express'
    })
}))

//get request
app.get('/',(request, response) => {
    response.send('hello')
})

//initialize passport
app.use(passport.initialize());
//if we are using sessions in our app we call passport sessions too
app.use(passport.session());

//Registering the groceries route, we can also add a prefix app.use('/groceries',groceriesRoute), like grouping it;
app.use('/api/v1/groceries',groceriesRoute);

//Registering the markets route,
app.use('/api/v1/markets',marketsRoutes);

//Registering the auth route,
app.use('/api/v1/auth',authRoutes);

app.listen(PORT,()=> console.log("run express on port 5000")) //express listens to actions via the port
