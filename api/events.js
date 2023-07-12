const express = require("express");
const mongoose = require('mongoose')
const router = express.Router();
const Events = require("../model/events");

//fetch from /api/events
router.get('/', async (req, res) => {
    res.json({mssg: `GET events`});
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