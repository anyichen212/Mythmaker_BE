const express = require("express");
const Users = require("../model/users");
const mongoose = require("mongoose");
const passport = require("passport");
const router = express.Router();

// fetch from api/Users/
router.get("/", async (req, res) => {
  // res.json({mssg: `GET Users`})
  try {
    //the {} will return ALL Users
    // .sort sorts the Users
    //-1 lists Users in descending order/newest first
    const allUsers = await Users.find({}).sort({ createdAt: -1 });

    allUsers
      ? res.status(200).json(allUsers)
      : res.status(404).send("Users not found");
  } catch (error) {
    console.log(error);
  }
});

// Get single user
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const user = await Users.findById(id).populate({
      path: "storyHistory",
      transform: doc => doc == null ? null : {Title:doc.title, _id: doc._id}
      
      
    });

    user
      ? res.status(200).json(user)
      : res.status(404).json({ error: "user not found" });
  } catch (error) {
    console.log(error);
  }
});

// add new user
// api/Users/
router.post("/", async (req, res) => {
  //res.json({mssg: "POST users"})
  const { username, email, password, storyIds } = req.body;

  try {
    const user = await Users.create({ username, email, password, storyIds });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete user
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const userToDelete = await Users.deleteOne({ _id: id });
    res.send("Deleted Successfully");
    res.status(201).json(userToDelete);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});

// Patch(update) user
router.patch("/:id", async (req, res) => {
  const id = req.params.id;

  //checks if objectId exist
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "User not found" });
  }

  try {
    const User = await Users.findOneAndUpdate(
      { _id: id },
      {
        ...req.body,
      }
    );

    // detect if user update exist
    //will display previous version of user data
    User
      ? res.status(200).json(User)
      : res.status(404).json({ error: "User not found" });
  } catch (error) {
    console.log(error);
  }
});

//auth routes
// api/users/auth/login
router.post("/auth/login", async (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(400).json({ message: info.message });
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      return res.json(user);
    });
  })(req, res, next);
});

//auth/signup
router.post("/auth/signup", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send("Required fields missing");
    }

    //check if email is already registered
    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const newUser = new Users({ email, password });

    await newUser.save();

    req.login(newUser, (err) => {
      if (err) return next(err);
      return res.json(newUser);
    });
  } catch (error) {
    next(error);
  }
});

//auth/logout
router.post("/auth/logout", function (req, res) {
  req.logout(function (err) {
    if (err) {
      // An error occurred during the logout process
      res.status(500).json({ error: "An error occurred while logging out." });
    } else {
      // Logout was successful
      res.status(200).json({ message: "Successfully logged out." });
    }
  });
});

//auth/me
router.get("/auth/me", (req, res) => {
  if (req.user) {
    res.json(req.user);
  } else {
    res.status(401).end();
  }
});

module.exports = router;
