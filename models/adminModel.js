const mongoose = require('mongoose')
const Joi = require('joi')
const postSchema = new mongoose.Schema({
    text : {
        type : String,
        required : true,
    },
    petType : {
        type : String,
        default : null
    },
    adopted : {
        type : Number,
    },
    petImg : {
        type : String,
        default : null
    },
    adoptionRequests : [String],
    owner : {
        type : String,
        required : true
    }
})

const Post = mongoose.model('PostAdmin', postSchema)

function validatePost(newPost) {
    const postObj = Joi.object({
        text : Joi.string().required().min(5),
        petImg : Joi.string(),
        adoptionRequests : Joi.array(),
        petType : Joi.string(),
    })
    return postObj.validate(newPost)
}

module.exports = {validatePost, Post}

