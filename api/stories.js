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
// api/stories/:id
router.get('/:id', async (req, res) => {
    const id  = req.params.id;

    //checks if objectId exist
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"Story not found"});
    }

    try{

     const Story = await Stories.findById(id)
 
     Story
     ? res.status(200).json(Story)
     : res.status(404).json({error:"Story not found"})
    }catch (error){
     console.log(error)
    }
 })

// Post(add) new story
// api/stories
router.post('/', async (req, res) => {

    try {
        const story = await Stories.create(req.body);
        res.status(200).json(story);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
})

// Delete story 
// api/stories/:id
router.delete('/:id', async (req, res) => {
    const id  = req.params.id;

    //checks if objectId exist
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"Story not found"});
    }

    try {
        const storyToDelete = await Stories.deleteOne({_id:id});
        res.status(201).send("Deleted Successfully : ").json(storyToDelete);
    } catch (error) {
        console.log(error);
        res.status(400).json({error: error.message});
        
    }
})

// Patch(update) story
router.patch('/:id', async (req, res) => {
    const id = req.params.id;

    //checks if objectId exist
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"Story not found"});
    }

    try {
        const Story = await Stories.findOneAndUpdate({_id : id}, {
            ...req.body
        })

        // detect if story update exist(return story before update)
        Story
        ? res.status(200).json(Story)
        : res.status(404).json({error:"Story not found"})
    } catch (error) {
        console.log(error);
    }
    
})

module.exports = router;