const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// option schema model, will be insert into event.options
// still unsure...
const optionSchema = new Schema({
    name: String,
    text: String,
    next: Number //change to objectId
})

// events schema model
const eventSchema = new Schema({
    name: {
        type: String
    },
    text: {
        type: String,
        required: true,
    },
    characterId: {
        type: Number,
        required: true,
    },
    option1: {
        type: optionSchema,
        required: true,
    },
    option2: {
        type: optionSchema,
    },
    option3: {
        type: optionSchema,
    }

}, { timestamps: true });

module.exports = mongoose.model('Events', eventSchema);