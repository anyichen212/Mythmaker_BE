const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const crypto = require('crypto');

// user model schema
// id may need alter to ObjectId for mongodb
// storyIds datatype may need changes
const userSchema = new Schema({
    username: {
        type: String,
        default:"unnamed",
        required:true
    },
    email: {
        type: String,
        unique:true,
        required:true,
    },
    password: {
        type: String,
        required: true
    },
    //salt is the unique id generate combine to the password to encrypt password
    salt:{
        type:String,
    },
    googleId:{
        type:String,
    },
    storyIds: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Stories',
    },
    storyHistory: {
        
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'Stories',
      
        
    }
});

//method we use to compare the password provided by the user with the stored password
userSchema.methods.correctPassword = function(pwAttempt) {
    return this.constructor.encryptPassword(pwAttempt, this.salt)===this.password;
}

//the method use to generate a random salt for password encryption
userSchema.statics.generateSalt = function(){
    return crypto.randomBytes(16).toString("base64");
}

//this method use to hash a password with a salt
userSchema.statics.encryptPassword =function(pw,salt) {
    return crypto
        .createHash("RSA-SHA256")
        .update(pw)
        .update(salt)
        .digest("hex");
}

//Mongoose middleware 
userSchema.pre("save", async function(next){
    //if the password field has been modified
    if(this.isModified("password")){
        //generate a new salt
        this.salt = await this.constructor.generateSalt();
        //hash the password field with the new salt
        this.password = await this.constructor.encryptPassword(this.password,this.salt);
    }
    next();
})

userSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('Users', userSchema);