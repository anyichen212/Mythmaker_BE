const router = require("express").Router();
const passport = require("passport");

const CLIENT_URL = `${process.env.FRONTEND_URL}/home`;

router.get("/login/success", (req, res) => {
  console.log("LOGIN SUCCESS HIT ", req.user, req.isAuthenticated());
  if (req.isAuthenticated()) {
    res.status(200).json({
      sucess: true,
      message: "successful",
      user: req.user,
    });
  }
});
//
router.get("/login/failed", (req, res) => {
  console.log("LOGIN FAILED");
  res.status(401).json({
    sucess: false,
    message: "failure",
  });
});

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

//the forth change
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

module.exports = router;
