const router = require("express").Router();
const passport = require("passport")

const CLIENT_URL = "http://localhost:3000/"

router.get("/login/success", (req, res)=>{
    if(req.user){
        res.status(200).json({
        sucess: true,
        message:"successful",
        user:req.user,
    })
}
})
//
router.get("/login/failed", (req, res)=>{
    res.status(401).json({
        sucess: false,
        message:"failure"
    })
})

router.get("/google",passport.authenticate("google", {scope:["profile"]}))

router.get("/google/callback", {
    successRedirect: CLIENT_URL
    failureRedirect: "/login/failed"
})