//imports
const express = require("express");
const cors = require("cors") //for cors security
const PORT = "8080";
const mongoose = require("mongoose");

//import from dotenv
require("dotenv").config();

const app = express();

app.use(express.json()); //middleware
app.use(cors());

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

//mount on api folder
app.use("/api", require("./api"));
