const express = require("express");
const Stories = require('../model/stories');
const mongoose = require('mongoose')
const router = express.Router();

// fetch from api/stories/
router.get('/', async (req, res) => {
   // res.json({mssg: `GET stories`})
   try{
    //the {} will return ALL stories
    // .sort sorts the stories 
    //-1 lists stories in descending order/newest first
    const allStories = await Stories.find({}).sort({createdAt: -1})

    allStories
    ? res.status(200).json(allStories)
    : res.status(404).send("Stories not found")
   }catch (error){
    console.log(error)
   }
})

// Get single story

// Post(add) new story
// api/stories/
router.post('/', async (req, res) => {
    const { title, currentEvent, creatorId } = req.body

    try {
        const story = await Stories.create({ title, currentEvent, creatorId });
        res.status(200).json(story);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
})

// Delete story 
router.delete('/:id', async (req, res) => {
    const id  = req.params.id;
    try {
        const storyToDelete = await Stories.deleteOne({_id:id});
        res.status(201).send("Deleted Successfully : ").json(storyToDelete);
    } catch (error) {
        console.log(error);
        res.status(400).json({error: error.message});
        
    }
})

// Patch(update) story

module.exports = router;