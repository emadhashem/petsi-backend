const {Review, validateReview} = require('../models/reviewsModel')
const router = require('express').Router()
const authMiddleWare = require('../middlewares/AuthMiddleWare')
const reviewHelper = require('../controllers/reviews')
router.post('/add', authMiddleWare, async (req, res) => {

    const {to , from, numberOfStars} = req.body
    const {error} = validateReview({to, from, numberOfStars})
    if(error) {
        return res.status(400).send(error.message)
    }
    try {
        const numberOfReviews = await Review.countDocuments({from, to})
        if(numberOfReviews >= 5) {
            return res.status(400).send('you have reached the max of reviews')
        }
        const newReview = await reviewHelper.addReview({to , from, numberOfReviews})
        return newReview

    } catch (ex) {
        return res.status(400).send(`${ex.message}`)
    }
})
router.delete('/remove', authMiddleWare, async (req, res) => {

    const {id} = req.body
    
    if(!id) {

        return res.status(400).send('review id not sended')
    }
    try {
        const deleteRes = await reviewHelper.removeReview(id)
        if(!deleteRes) {

            return res.status(400).send('review not deleted')
        }
        return res.send('review deleted sucssefully')
    } catch (ex) {
        return res.status(400).send(`${ex.message}`)
    }
})

router.put('/update', authMiddleWare, async (req, res) => {

    const {id, newNumber} = req.body
    
    if(!id || !newNumber) {

        return res.status(400).send('review id and number of stars not sended')
    }
    try {
        const updateReview = await reviewHelper.updateReview(id, newNumber)
        if(!updateReview) {

            return res.status(400).send('review not updated')
        }
        return res.send('review updated sucssefully')
    } catch (ex) {
        return res.status(400).send(`${ex.message}`)
    }
})
module.exports = router