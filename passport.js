const GoogleStrategy = require(`passport-google-oauth20`).Strategy;



//change import user
const Users = require('./model/users');
//change import passport
const passport = require("passport");


passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "https://mythmaker.vercel.app/auth/google/callback"
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

