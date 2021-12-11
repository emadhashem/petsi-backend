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
        required : true
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

const Post = mongoose.model('Post', postSchema)

function validatePost(newPost) {
    const postObj = Joi.object({
        text : Joi.string().required().min(5),
        petImg : Joi.string(),
        adoptionRequests : Joi.array(),
        adopted : Joi.number(),
        petType : Joi.string(),
        owner : Joi.string().required()
    })
    return postObj.validate(newPost)
}

module.exports = {validatePost, Post}

