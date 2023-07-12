const express = require("express");
const Stories = require('../model/stories');

const router = express.Router();

// fetch from api/stories/
router.get('/', (req, res) => {
    res.json({mssg: `GET stories`})
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

// Patch(update) story

module.exports = router;