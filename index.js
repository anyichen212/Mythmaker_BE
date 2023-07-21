//imports
const express = require("express");
const cors = require("cors"); //for cors security
const PORT = "8080";
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Users = require("./model/users");

//import from dotenv
require("dotenv").config();

//importing passport file
const passportSetup = require("./passport");

const app = express();

app.use(
    cors({
      origin: "http://localhost:3000",
      methods: "GET,POST,PUT,DELETE,PATCH",
      credentials: true,
    })
  );

//express session
app.use(
  session({
    secret: "mythmaker",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(express.json()); //middleware

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      const user = await Users.findOne({ email: email });
      if (!user) return done(null, false, { message: "Email not registered" });

      const passwordIsValid = await user.correctPassword(password);
      if (!passwordIsValid)
        return done(null, false, { message: "Password Incorrect" });

      return done(null, user);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  const user = await Users.findById(id);
  done(null, user);
});

//mount on api folder
app.use("/api", require("./api"));

app.get("/", (req, res) => {
  res.send("On port 8080 successfully");
});



// connect to db(mongodb)
mongoose
  .connect(process.env.MONG_URI)
  .then(() => {
    // run app.listen for requests
    serverRun();
  })
  .catch((error) => {
    console.log(error);
  });

passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      const user = await Users.findOne({ email: email });
      if (!user) return done(null, false, { message: "Email not registered" });

      // Handle case where user doesn't have a password
      if (user.password === undefined) {
        return done(null, false, {
          message: "This account does not have a password.",
        });
      }

      const passwordIsValid = await user.correctPassword(password);
      if (!passwordIsValid)
        return done(null, false, { message: "Password Incorrect" });

      return done(null, user);
    }
  )
);



//the third the change
app.use("/auth", require("./routes/auth"));

//run server
const serverRun = () => {
    app.listen(PORT, () => {
      console.log(`CONNECT to db % LIVE on port: ${PORT}`);
    });
  };
