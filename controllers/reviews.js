const {Review} = require('../models/reviewsModel')

async function addReview(newReview) {
    const saveNewReview = await (new Review({newReview})).save()
    return saveNewReview._doc
}
async function removeReview(id) {
    const deleteReview = await Review.deleteOne({_id : id})
    return deleteReview.deletedCount
}
async function updateReview(id, newNumber) {
    const updateReview = await Review.updateOne({_id : id}, {
        numberOfStars : newNumber
    })
    return updateReview.modifiedCount
}
module.exports = {addReview , removeReview, updateReview}