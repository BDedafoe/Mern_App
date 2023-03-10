const express = require('express')
const passport = require('passport')
const bcrypt = require('bcryptjs');
const router = express.Router()

// Load User model
const User = require('../src/models/User');
const { forwardAuthenticated } = require('../src/middleware/auth');

// Login Page
router.get('/login', forwardAuthenticated, (req, res) => res.render('login'));

// Register Page
router.get('/register', forwardAuthenticated, (req, res) => res.render('register'));

// Register
router.post('/register', (req, res) => {
  const { firstName, lastName, email, password, password2 } = User.create(req.body)
  
  let errors = [];

  if (!firstName ||!lastName ||!email || !password || !password2) {
    message.innerHTML="Please enter all fields.";
  }

  if (password != password2) {
    console.log('Passwords do not match');
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      firstName,
      lastName,
      email,
      password,
      password2
    });
  } else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: 'Email already exists' });
        res.render('register', {
          errors,
          firstName,
          lastName,
          email,
          password,
          password2
        });
      } else {
        const newUser = new User({
          firstName,
          lastName,
          email,
          password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                req.flash(
                  'success_msg',
                  'You are now registered and can log in'
                );
                res.redirect('/users/login');
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});

// Login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});


// Logout
router.get('/logout', (req, res) => {
  req.logout((error) => {
    req.flash('success_msg', 'You are logged out')
    res.redirect('/users/login')
  });
});



module.exports = router;