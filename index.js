//imports
const express = require("express");
const cors = require("cors") //for cors security
const PORT = "8080";


//import from db folder
//const db = require("./db")

const app = express();

app.use(express.json());
app.use(cors());

//mount on api folder
//app.use("/api", require("./api"));

app.get('/', (req, res) => {
    res.send('On port 8080 successfully');
})

//sync db folder
//const syncDB = () => db.sync();

//run server
const serverRun = () => {
    app.listen(PORT, () => {
        console.log(`LIVE on port: ${PORT}`);
    });
}

//syncDB();
serverRun();
