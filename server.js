const express = require('express')
const app = express()
const dotenv = require('dotenv')
const passport = require('passport')
const path = require('path')
const bodyParser = require('body-parser')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const MongoStore = require('connect-mongo')
const connectDB = require('./config/db.js')
const axios = require('axios')
const PORT = process.env.PORT || 8080
const cors = require('cors');

// Load config
dotenv.config({ path: '.env' })

// Passport Config
require('./config/passport')

// Database connection
connectDB()

// Logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
  }



app.use(express.json({ extended: false }));

app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname + '/public')))
app.use(cors({ origin: true, credentials: true }));
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

app.get('/', (req, res) => res.send('Hello Smokey'))

// Routes
app.use('/', require('./routes/index.js'))
app.use('/users', require('./routes/users.js'))
app.use('/auth', require('./routes/auth.js'))


app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))
