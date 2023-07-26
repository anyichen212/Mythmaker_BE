const GoogleStrategy = require(`passport-google-oauth20`).Strategy;

const GOOGLE_CLIENT_ID="613553735108-i093tt2o37363kg4dqqqp7umpeva716i.apps.googleusercontent.com"
const GOOGLE_CLIENT_SECRET="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"

//change import user
const Users = require('./model/users');
//change import passport
const passport = require("passport");


passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:8080/auth/google/callback"
},

async function(accessToken, refreshToken, profile, cb) {
  try {
    console.log(accessToken)
      let user = await Users.findOne({ email: profile.emails[0].value, googleId: profile.id })
      ?.populate({
        path: "storyHistory",
        transform: doc => doc == null ? null : {Title:doc.title, _id: doc._id}});

        //console.log(user);

      if(user) {
          // if the user is found, return it
          cb(null, user);
      } else {
        
          user = await Users.create({
              username: profile.displayName,
              googleId: profile.id,
               email : profile.emails[0].value || "",
               password : profile.password || ""
          });

          cb(null, user);
      }
  } catch(error) {
      cb(error, null);
  }
}));

