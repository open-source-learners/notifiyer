const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
// Load User model
const Students = require('../models/Students');
module.exports = function (passport) {
 passport.use(new LocalStrategy({
  usernameField: 'email'
 }, (email, password, done) => { 
   // Match user 
  Students.findOne({
   email: email
  }).then(Student => {
   if (!Student) {
    return done(null, false, {
     message: 'That email is not registered'
    });
   }
   // Match password
   bcrypt.compare(password, Student.password, (err, isMatch) => {
    if (err) return done(err);
    if (isMatch) {
     return done(null, Student);
    } else {
     return done(null, false, {
      message: 'Incorrect Password or Email'
     });
    }
   });
  });
 }));
 passport.serializeUser(function (Student, done) {
  done(null, Student.id);
 });
 passport.deserializeUser(function (id, done) {
  Students.findById(id, function (err, Student) {
   done(err, Student);
  });
 });
};