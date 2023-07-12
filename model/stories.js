const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// story model schema
// currentEvent, creatorId dataType may need alter to ObjectId for mongodb
// events and characters datatype may need changes
const storySchema = new Schema({
    title: {
        type: String,
        required:true
    },
    events: {
        type: [Number]
    },
    characters: {
        type: [Number]
    },
    currentEvent: {
        type: Number,
        require: true
    },
    creatorId: {
        type: Number,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Stories', storySchema);