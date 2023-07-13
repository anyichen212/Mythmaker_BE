const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// user model schema
// id may need alter to ObjectId for mongodb
// storyIds datatype may need changes
const userSchema = new Schema({
    username: {
        type: String,
        required:true
    },
    email: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    storyIds: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Stories',
    }
});

module.exports = mongoose.model('Users', userSchema);