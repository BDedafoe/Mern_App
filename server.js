const express = require('express')
const app = express()
const PORT = process.env.PORT || 8000
const path = require('path')
const bodyParser = require("body-parser")
const dotenv = require('dotenv')
const bcrypt = require('bcryptjs')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
const morgan = require('morgan')
const mongoose = require('mongoose')
const connectDB = require('./src/config/db')
const MongoStore = require('connect-mongo')
const cookieParser = require("cookie-parser");
const axios = require('axios')
const cors = require('cors');
const User = require('./src/models/User')
const expressLayouts = require('express-ejs-layouts')
// Load config
dotenv.config({ path: '.env' })

// Passport Config
require('./src/config/passport')

// Database connection
connectDB()

// Logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
  }

  app.use(cors({ origin: true, credentials: true }));

// Init Middleware
app.use(express.json({ extended: false }));
app.use(expressLayouts)
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname + '/public')))
app.use(express.static(path.join(__dirname, 'views/js')))
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(flash())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI })
}))





// Passport middleware
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

// Global variables
app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error')
    res.locals.user = req.user || null
    next();
});



// Routes
app.use('/', require('./routes/index.js'))
const user = ('/users', require('./routes/users.js'))
app.use('/auth', require('./routes/auth.js'))

app.use('/users', user);


    const server = app.listen(8000, () => {
        console.log("server listening on port 8000");
    });




