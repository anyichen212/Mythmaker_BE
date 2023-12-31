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
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Events', //refrence from events model, auto detects if objectId is a existing one that belongs to events
        //autopopulate: true,
    },
    //append character id manuelly 
    characters: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'characters', //refrence from characters model
        autopopulate: true,
    },
    //insert and change event id manuelly
    currentEvent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Events',
        require: true
    },
    //insert creator id manuelly
    creatorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users', //ref from users model
        required: true,
        //autopopulate: true
    }
}, { timestamps: true });

//populate(grab connected data) all the fields with autopopulate set to true 
storySchema.plugin(require('mongoose-autopopulate'));
module.exports = mongoose.model('Stories', storySchema);