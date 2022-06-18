var passport = require('passport');
var GoogleStrategy = require('passport-google-oidc');
var Students = require("../models/Students");

passport.use(new GoogleStrategy({
    clientID: process.env['GOOGLE_CLIENT_ID'],
    clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
    callbackURL: 'https://www.example.com/oauth2/redirect/google'
  },
  function(issuer, profile, cb) {
    Students.findOne({issuer:profile.id}
    , function(err, cred) {
      if (err) { return cb(err); }
      if (!cred) {
        // The Google account has not logged in to this app before.  Create a
        // new user record and link it to the Google account.
        const Student = new Students({
            issuer:profile.id,
            email:profile.email,
            name:profile.displayName
        })
        Student.save(function(err,student) {
            if (err) { return cb(err); }
            return cb(null, student);
          })
        
      } else {
        // The Google account has previously logged in to the app.  Get the
        // user record linked to the Google account and log the user in.
        Students.findOne({issuer:issuer}, function(err, student) {
          if (err) { return cb(err); }
          if (!student) { return cb(null, false); }
          return cb(null, student);
        });
      }
    }
)}
));