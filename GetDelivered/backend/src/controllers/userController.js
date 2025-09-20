'use strict';

var mongoose = require('mongoose'),
  jwt = require('jsonwebtoken'),
  bcrypt = require('bcrypt'),
  User = mongoose.model('User');

exports.register = function(req, res) {
  var newUser = new User(req.body);
  newUser.hash_password = bcrypt.hashSync(req.body.password, 10);
  newUser.save()
  .then(data => {
    res.send(data);
}).catch(err => {
    res.status(409).send({
        message: err.message || "Some error occurred while creating the user."
    });
});
};

exports.sign_in = async function(req, res) {
  User.findOne({
    email: req.body.email
  }).then(async user => {
    if (!user || !user.comparePassword(req.body.password)) {
      return res.status(401).json({ message: 'Authentication failed. Invalid user or password.' });
    }
  
    var tokenValue = jwt.sign({ email: user.email, fullName: user.fullName, _id: user._id }, 'RESTFULAPIs') ;
    await User.findOneAndUpdate({ email :  req.body.email }, { token: tokenValue });
    res.json({ token: tokenValue ,email: user.email,name: user.firstName, _id:user._id});
  
  });
};

exports.loginRequired = function(req, res, next) {
  if (req.user) {
    next();
  } else {

    return res.status(401).json({ message: 'Unauthorized user!!' });
  }
};
exports.profile = function(req, res, next) {
  if (req.user) {
    res.send(req.user);
    next();
  } 
  else {
   return res.status(401).json({ message: 'Invalid token' });
  }
};

exports.sign_out = async function(req,res) {
  await User.findOneAndUpdate({ email :  req.body.email }, { token: 0 });
  return res.status(200).send({
    message: "Logged out successfully"
});
}

