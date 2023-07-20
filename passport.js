const GoogleStrategy = require(`passport-google-oauth20`).Strategy;

const GOOGLE_CLIENT_ID="613553735108-i093tt2o37363kg4dqqqp7umpeva716i.apps.googleusercontent.com"
const GOOGLE_CLIENT_SECRET="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"

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://www.example.com/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    //use cb for our mongodb
    const user = {
        username:profile.displayName
    };
    user.save();
    })
)
