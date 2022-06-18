const facebookStrategy = require('passport-facebook').Strategy;
const Students = require('../models/Students');


// passport.use(new FacebookStrategy({
//     clientID: FACEBOOK_APP_ID,
//     clientSecret: FACEBOOK_APP_SECRET,
//     callbackURL: "http://localhost:2000/auth/facebook/callback"
//   },
//   function(accessToken, refreshToken, profile, cb) {
//     User.findOrCreate({ facebookId: profile.id },
//          function (err, user) {
//       return cb(err, user);
//     });
//   }
// ));

module.exports = function(passport){

  passport.use(new facebookStrategy({
    clientID: process.env.APP_ID,
    clientSecret: process.env.APP_SECRET,
    callbackURL: "http://localhost:2000/auth/facebook/callback"
   },
   function(accessToken, refreshToken, profile, cb) {
    User.findOne({ facebookId: profile.id },
         function (err, user) {
      return cb(err, user);
    });
  }));

  passport.serializeUser(function(user,cb){
    cb(null,user);
  });

  passport.deserializeUser(function(obj,cb){
      cb(null,obj)
  })

}