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
        res.status(201).json({message: "Deleted Successfully", story: storyToDelete});
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

//add character to the story
// api/stories/:storyId/:characterId
router.patch('/:storyId/:characterId', async (req,res) => {
    const {storyId, characterId} = req.params;

    //check if objectId exist
    if(!mongoose.Types.ObjectId.isValid(storyId) || !mongoose.Types.ObjectId.isValid(characterId) ){
        return res.status(404).json({error:"Story or Character not found"});
    }

    try {
        //find the story by the id 
        const story = await Stories.findById(storyId);

        //if story not found
        if(!story){
            return res.status(404).json({error: "Story not found"});
        }

        //append characterId to the story's characterId array
        story.characters.push(characterId);

        //save the updated history
        const updatedStory = await story.save();

        //return the updated story
        res.status(200).json(updatedStory);
    } catch (error) {
        console.error(error);
    }

});

// <<<<<<< hafeefasbranch
// fetching from stories.js to get the title for now
router.get('/:id/:userId', async (req, res) => {
    const userId  = req.params.userId;

    //checks if objectId / userId exist
    if(!mongoose.Types.ObjectId.isValid(userId)){
        return res.status(404).json({error:"Story not found"});
    }
    try{
    //const allStories = await Stories.find({}).sort({createdAt: -1})
    //finds every single story in the database, .sort sorts everything, the createdAt -1 is going to return the most recent story in descending order
     const storyTitles = await Stories.find({ creatorId: userId }).sort({createdAt: -1});
 
     storyTitles
     ? res.status(200).json(storyTitles)
     : res.status(404).json({error:"Story Titles not found"})
    }catch (error){
     console.log(error)
    }
 })



module.exports = router;