const router = require('express').Router()
const { validatePost, Post : PostAdmin } = require('../models/adminModel')
const postHelper = require('../controllers/Posts')
const authMiddleware = require('../middlewares/AuthMiddleWare')

async function deletePostFromAdmin(postId) {
    const remove = await PostAdmin.deleteOne({_id : postId})
    return remove
}

router.post('/get10posts', async(req, res) => {

    const {lstPostId} = req.body
    if(!lstPostId) return res.status(400).send(`lst postid not found`)

    try {
        if(lstPostId == '0') {
            const posts = await PostAdmin.find({}).limit(10);
            return res.send(posts)
        }
        const posts = await PostAdmin.find({_id : {"$gt'" : lstPostId}}).limit(10);
        return res.send(posts)
    } catch (ex) {
        return res.status(400).send(`${ex.message}`)
    }
})

router.post('/add', async(req, res) => {

    const {post} = req.body
    if(!post) return res.status(400).send(`post or id missing`)

    try {
        const addNewPostAfterAdminValidate = await postHelper.addPost(post)
        return res.send(addNewPostAfterAdminValidate)
    } catch (error) {
        return res.status(400).send(`${ex.message}`)
    }
})

router.post('/delete', async (req, res) => {

    const {postId} = req.body
    try {
        const removePost = await deletePostFromAdmin(postId)
        if(!removePost.deletedCount) {
            return res.status(400).send(`post didnt removed from admin posts`)
        }
        return res.send('post deleted succefully')
    } catch (ex) {
        return res.status(400).send(`${ex.message}`)
    }

})



module.exports = router