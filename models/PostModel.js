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
    adoptionRequests : {
        type : [String],
        default : []
    },
    owner : {
        type : String,
        
    }
})

const Post = mongoose.model('Post', postSchema)

function validatePost(newPost) {
    const postObj = Joi.object({
        text : Joi.string().required().min(5),
        petImg : Joi.string(),
        adoptionRequests : Joi.array(),
        petType : Joi.string(),
        owner : Joi.string()
    })
    return postObj.validate(newPost)
}

module.exports = {validatePost, Post}

