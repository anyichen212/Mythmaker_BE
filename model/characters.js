const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// charcters model schema
// id may need alter to ObjectId for mongodb
// storyIds datatype may need changes
const charctersSchema = new Schema({
    name: {
        type: String,
        required:true
    }
}, { timestamps: true });

module.exports = mongoose.model('charcters', charctersSchema);