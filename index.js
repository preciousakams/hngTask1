const express = require('express');

const connectFlash = require('connect-flash')
const { config, engine } = require('express-edge');
const expressSession = require('express-session')
const path = require('path')
const mongoose = require('mongoose')
const connectMongo = require('connect-mongo')
const regpageController = require('./controlers/regpageController.js')
const bodyParser = require('body-parser')
const storeUserController = require('./controlers/storeUser')
const loginController = require('./controlers/loginController')
const loginpageController = require('./controlers/login')
const userPageController = require('./controlers/user')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 60
const uri = "mongodb+srv://prym:nagato01@cluster0-tvoih.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
mongoose.connect(connectString, { useNewUrlParser: true })
client.connect(err => {
  const collection = client.db("global").collection("devices");
  // perform actions on the collection object
  client.close();
});
//mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/global');
//mongodb+srv://pryme:<nagato1>@cluster0-i0ivc.mongodb.net/test?retryWrites=true&w=majority
const mongoStore = connectMongo(expressSession)
const app = express();

app.use(expressSession({

    secret: 'secret',
    store: new mongoStore({
        mongooseConnection: mongoose.connection
    }),

    cookie: { maxAge: 200000 }

}));
// Configure Edge if need to
config({ cache: process.env.NODE_ENV === 'production' });

// Automatically sets view engine and adds dot notation to app.render

app.use(connectFlash())
app.use(express.static('public'))
app.use(engine);
app.set('views', `${__dirname}/views`)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', regpageController)
app.get('/login', loginpageController)
app.get('/user', userPageController)
app.post('/users/register', storeUserController)
app.post('/users/login', loginController)


app.listen(port);