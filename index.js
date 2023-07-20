//imports
const express = require("express");
const cors = require("cors") //for cors security
const PORT = "8080";
const mongoose = require("mongoose");
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Users = require('./model/users');

//import from dotenv
require("dotenv").config();

//importing passport file
const passportSetup = require("./passport")

const app = express();

//express session
app.use(session({
    secret:"mythmaker",
    resave:false,
    saveUninitialized:false
}));

app.use(express.json()); //middleware
app.use(cors());

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
    {usernameField: 'email'},
    async (email,password,done)=>{
        const user = await Users.findOne({email:email});
        if(!user) return done(null,false,{message:'Email not registered'});

        const passwordIsValid = await user.correctPassword(password);
        if(!passwordIsValid) return done(null, false, {message:'Password Incorrect'});

        return done(null,user);

    }
));

passport.serializeUser((user,done) => {
    done(null, user._id);
});

passport.deserializeUser(async (id,done) => {
    const user = await Users.findById(id);
    done(null, user);
});



//mount on api folder
app.use("/api", require("./api"));

app.get('/', (req, res) => {
    res.send('On port 8080 successfully');
})

//run server
const serverRun = () => {
    app.listen(PORT, () => {
        console.log(`CONNECT to db % LIVE on port: ${PORT}`);
    });
}

// connect to db(mongodb)
mongoose.connect(process.env.MONG_URI)
    .then(() => {
        // run app.listen for requests 
        serverRun();
    })
    .catch((error) => {
        console.log(error);
    })
