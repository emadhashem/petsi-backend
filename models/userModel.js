
const Joi = require('joi');
const mongoose = require('mongoose')

/**
 * 
 * user name
 * email
 * id,
 * password,
 * profile photo
 * user number
 */


const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        min: 3,

    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phoneNumber: {

        type: String,
        min : 11
    },
    password : {
        type : String,
        required : true,
        min : 4,
    },
    role : {
        type : String,
        default : 'user'
    },
    userImg : {
        type : String
    },
    posts : [String]
})


const User = mongoose.model('User' , userSchema)


function validateSignUp(newUser) {
    const validateSignUpObj = Joi.object({
        userName : Joi.string().min(3).required(),
        email : Joi.string().max(255).min(4).required().email(),
        password : Joi.string().max(255).min(4).required(),
    })
    return validateSignUpObj.validate(newUser)
}
function validateLogin(user) {
    const validateLoginObj = Joi.object({
        email : Joi.string().max(255).min(6).required().email(),
        password : Joi.string().max(255).min(4).required(),
    })
    return validateLoginObj.validate(user)
}

module.exports = {User, validateLogin, validateSignUp}