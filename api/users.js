const express = require("express");
const Users = require('../model/users');
const mongoose = require('mongoose')
const router = express.Router();

// fetch from api/Users/
router.get('/', async (req, res) => {
   // res.json({mssg: `GET Users`})
   try{
    //the {} will return ALL Users
    // .sort sorts the Users 
    //-1 lists Users in descending order/newest first
    const allUsers = await Users.find({}).sort({createdAt: -1})

    allUsers
    ? res.status(200).json(allUsers)
    : res.status(404).send("Users not found")
   }catch (error){
    console.log(error)
   }
})

// Get single user
router.get('/:id', async (req, res) => {
    const id  = req.params.id;
    try{

     const user = await Users.findById(id)
 
     user
     ? res.status(200).json(user)
     : res.status(404).json({error:"user not found"})
    }catch (error){
     console.log(error)
    }
 })

// add new user
// api/Users/
router.post('/', async (req, res) => {
    //res.json({mssg: "POST users"})
    const { username, email, password, storyIds } = req.body

    try {
        const user = await Users.create({ username, email, password, storyIds});
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
})

// Delete user 
router.delete('/:id', async (req, res) => {
    const id  = req.params.id;
    try {
        const userToDelete = await Users.deleteOne({_id:id});
        res.status(201).send("Deleted Successfully : ").json(userToDelete);
    } catch (error) {
        console.log(error);
        res.status(400).json({error: error.message});
        
    }
})

// Patch(update) user
router.patch('/:id', async (req, res) => {
    const id = req.params.id;

    //checks if objectId exist
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"User not found"});
    }

    try {
        const User = await Users.findOneAndUpdate({_id : id}, {
            ...req.body
        })

        // detect if user update exist
        //will display previous version of user data
        User
        ? res.status(200).json(User)
        : res.status(404).json({error:"User not found"})
    } catch (error) {
        console.log(error);
    }
    
})

module.exports = router;