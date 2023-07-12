const express = require("express");
const mongoose = require('mongoose')
const router = express.Router();
const Events = require("../model/events");

//fetch from /api/events, all events
router.get('/', async (req, res) => {

    try {
        //find all events
      const allEvents = await Events.find({});
      
      //if all events exist, returns them. Else return error
      allEvents
      ? res.status(200).json(allEvents)
      : res.status(404).send("Events not found");
    } catch (error) {
        console.log("get all event error: \n", error);
    }
 })

//fetch single event 
router.get('/:id', async (req, res) => {
    const id  = req.params.id;

    //checks if objectId exist
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"Event not found"});
    }

    try{
        const event = await Events.findById(id)
    
        event
        ? res.status(200).json(event)
        : res.status(404).json({error:"Event not found"})
    }catch (error){
     console.log("fetch single event error: \n", error)
    }
 })

 //post new events, /api/events
router.post('/', async (req, res) => {

    //datas received
    const { name, text, characterId, options } = req.body

    try {
        const event = await Events.create({ name, text, characterId, options });
        res.status(200).json(event);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
    });

module.exports = router;