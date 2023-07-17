const express = require("express");
const Characters = require('../model/characters');
const mongoose = require('mongoose')
const router = express.Router();

// fetch from api/Characters/
router.get('/', async (req, res) => {
   // res.json({mssg: `GET Characters`})
   try{
    //the {} will return ALL Characters
    // .sort sorts the Characters 
    //-1 lists Characters in descending order/newest first
    const allCharacters = await Characters.find({}).sort({name: 1})

    allCharacters
    ? res.status(200).json(allCharacters)
    : res.status(404).send("Characters not found")
   }catch (error){
    console.log(error)
   }
})

// Get single character
router.get('/:id', async (req, res) => {
    const id  = req.params.id;
    try{

     const character = await Characters.findById(id)
 
     character
     ? res.status(200).json(character)
     : res.status(404).json({error:"character not found"})
    }catch (error){
     console.log(error)
    }
 })

// add new character
// api/Characters/
router.post('/', async (req, res) => {
    //res.json({mssg: "POST Character"})
    const { name } = req.body

    try {
        const character = await Characters.create({ name });
        res.status(200).json(character);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
})

// Delete Character 
router.delete('/:id', async (req, res) => {
    const id  = req.params.id;
    try {
        const CharacterToDelete = await Characters.deleteOne({_id:id});
        res.send("Deleted Successfully")
       // res.status(201).json(CharacterToDelete);
    } catch (error) {
        console.log(error);
        res.status(400).json({error: error.message});
        
    }
})

// Patch(update) Character
router.patch('/:id', async (req, res) => {
    const id = req.params.id;

    //checks if objectId exist
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"Character not found"});
    }

    try {
        const Character = await Characters.findOneAndUpdate({_id : id}, {
            ...req.body
        },{new:true})

        // detect if Character update exist
        //will display previous version of Character data
        Character
        ? res.status(200).json(Character)
        : res.status(404).json({error:"Character not found"})
    } catch (error) {
        console.log(error);
    }
    
})

module.exports = router;