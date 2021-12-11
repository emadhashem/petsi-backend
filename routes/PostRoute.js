const router = require('express').Router()
const { validatePost, Post } = require('../models/PostModel')
const { User } = require('../models/userModel')
const authMiddleware = require('../middlewares/AuthMiddleWare')
router.post('/add', authMiddleware , async (req, res) => {

    const postObj = req.body
    try {
        const { error } = validatePost(postObj)
        if (error) {
            return res.status(400).send(` ${error.message}`)
        }
        const newPost = new Post(postObj)
        const save = await newPost.save()
        const  owner = req.user._id
        const addPostID = await User.updateOne({ _id : owner },
            { "$push": { "posts":  save._doc._id  } },
            { "new": true, "upsert": true },
        )
        if(!addPostID.modifiedCount) {
            return res.status(400).send(`not added to the user posts`)
        }
        
        return res.send(save._doc)
    } catch (ex) {
        return res.status(400).send(`some thing wrong ${ex.message}`)
    }
})
router.delete('/delete', async (req, res) => {



})


module.exports = router