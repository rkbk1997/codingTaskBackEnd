var express = require('express');
var router = express.Router();
// const nodemailer = require("nodemailer");
var User = require('../models/userRegster');
var passport = require('passport');

router.post('/register', function (req, res, next) {
  User.find({ username: req.body.username }, (error, data) => {
    if (data) {
      if (data.length > 0) {
        res.send(false);
      }
      else {
        addToDB(req, res);
      }
    }
  });
});
async function addToDB(req, res) {
  var user = new User({
    email: req.body.username,
    username: req.body.username,
    password: User.hashPassword(req.body.password),
    fname: req.body.fname,
    lname: req.body.lname,
    creation_dt: Date.now(),
    role: 'user',
    status: 0
  });

  try {
    doc = await user.save();
    return res.send(true)
  }
  catch (err) {
    return res.status(501).json(err);
  }
}

router.post('/login', function (req, res, next) {
  console.log(req.body)
  passport.authenticate('local', function (err, user, info) {
    if (err) { return res.status(501).json(err); }
    if (!user) { return res.send(info); }
    req.logIn(user, function (err) {
      if (err) { return res.status(501).json(err); }
      return res.status(200).json({ message: true, userrole: user.role });
    });
  })(req, res, next);
});


router.get('/user', isValidUser, function (req, res, next) {
  return res.status(200).json({status : true, body:req.user});
});

router.get('/logout', isValidUser, function (req, res, next) {
  req.logout();
  return res.status(200).json({ message: 'Logout Success' });
})

function isValidUser(req, res, next) {
  if (req.isAuthenticated()) next();
  else 
  return res.status(401).json({ message: 'Unauthorized Request' });
}

module.exports = router;
