const AuthMiddleWare = require('../middlewares/AuthMiddleWare')
const { Post } = require('../models/PostModel')
const { User } = require('../models/userModel')

const router = require('express').Router()

router.put("/update/phonenumber", AuthMiddleWare, async (req , res) => {
    const {newNumber} = req.body
    if(!newNumber) return res.status(400).send('number not found')
    try {
        const owner = req.user._id
        const changeNumber = await User.updateOne({_id : owner}, {
            phoneNumber : newNumber
        })
        if(!changeNumber.modifiedCount) {

            return res.status(400).send('number not updated')
        }
        return res.send('number is updated successfully')
    } catch (ex) {
        return res.status(400).send(ex.message)
    }
})
router.put("/update/img", AuthMiddleWare, async (req , res) => {
    const {newimg} = req.body
    if(!newimg) return res.status(400).send('img not found')
    try {
        const owner = req.user._id
        const changeImg = await User.updateOne({_id : owner}, {
            userImg : newimg
        })
        if(!changeImg.modifiedCount) {

            return res.status(400).send('img not updated')
        }
        return res.send('img is updated successfully')
    } catch (ex) {
        return res.status(400).send(ex.message)
    }
})
router.post('/getallposts', async (req, res) => {
    const {lstId} = req.body
    if(!lstId) return res.status(400).send('last id of data not found')
    try {
        if(lstId === "0") {
            const posts = await Post.find().limit(10)
            return res.send(posts)
        }
        const posts = await Post.find({_id : {'$gt': lstId}}).limit(10)
        return res.send(posts)
    } catch (ex) {
        return res.status(400).send(ex.message)
    }
})
module.exports = router