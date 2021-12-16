const Joi = require('joi')
const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
    to :{
        type : String,
        required : true
    },
    from :{
        type : String,
        required : true
    },
    numberOfStars : {
        type : Number,
        required : true
    }

})
const Review = mongoose.model('Review', reviewSchema)
function validateReview(newReview) {
    const validateReviewobj = Joi.object({
        to : Joi.string().required(true),
        from : Joi.string().required(true),
        numberOfStars : Joi.number().required(true)
    })
}

module.exports = {Review, validateReview}

