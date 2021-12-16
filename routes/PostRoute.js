const router = require('express').Router()
const { validatePost, Post } = require('../models/PostModel')
const {validatePost : ValidatePostAdmin, Post : PostAdmin} = require('../models/adminModel')
const { User } = require('../models/userModel')
const authMiddleware = require('../middlewares/AuthMiddleWare')
router.post('/add', authMiddleware, async (req, res) => {

    const postObj = req.body
    try {
        const { error } = validatePost(postObj)
        if (error) {
            return res.status(400).send(` ${error.message}`)
        }
        const owner = req.user._id
        const newpost = {...postObj, owner}
        const saveNewPostAmin = await (new PostAdmin(newpost)).save()
        return saveNewPostAmin._doc
    } catch (ex) {
        return res.status(400).send(`some thing wrong ${ex.message}`)
    }
})

router.put("/update/text" ,authMiddleware, async (req, res) => {

    const {newText, post} = req.body

    if(!newText || !post) {
        return res.status(400).send(`new text or post not sended`)

    }
    try {
        const addToAdminForUpdate = await (new PostAdmin({...post, text : newText})).save()
        return res.send(addToAdminForUpdate._doc)
    } catch (ex) {
        return res.status(400).send(`some thing wrong ${ex.message}`)
    }
})
router.put("/update/petimg" ,authMiddleware, async (req, res) => {

    const {petImg, post} = req.body

    if(!petImg || !post) {
        return res.status(400).send(`new petimg or post not sended`)
    }
    try {
        const addToAdminForUpdate = await (new PostAdmin({...post, petImg})).save()
        return res.send(addToAdminForUpdate._doc)
    } catch (ex) {
        return res.status(400).send(`some thing wrong ${ex.message}`)
    }
})
router.delete('/delete', authMiddleware, async (req, res) => {
    const { postId } = req.body
    if (!postId) return res.status(400).send(`post id missing`)
    try {
        const owner = req.user._id
        const deletepost = await Post.deleteOne({ _id: postId })
        if (!deletepost.deletedCount) {
            return res.status(400).send('post not removed')
        }
        const deletePostFromUserArr = await User.updateOne({ _id: owner },
            { "$pull": { "posts": postId } },
            { safe: true, multi: true },
        )
        if (!deletePostFromUserArr.modifiedCount) {
            return res.status(400).send('post not removed, user arr')
        }
        return res.send('post deleted succefully')
    } catch (ex) {
        return res.status(400).send(`some thing wrong ${ex.message}`)
    }
})



router.put('/update/addadoptrequest', authMiddleware, async (req, res) => {
    const { postId } = req.body
    if (!postId) return res.status(400).send('postid not found')

    try {
        const ownerOfRequst = req.user._id
        const checkIfUserAddReq = await Post.findOne({_id : postId})
        if(checkIfUserAddReq) {
            const postreqs = checkIfUserAddReq._doc.adoptionRequests
            let cur = [...postreqs]
            let fg = false
            cur.forEach(item => {
                if(item == ownerOfRequst) {
                    fg = 1
                    return
                }
            })
            if(fg) return res.status(400).send('already u added a request')
        }
        const updatePostRequests = await Post.updateOne({ _id: postId },
            { "$push": { "adoptionRequests": ownerOfRequst } },
            { "new": true, "upsert": true },
        )
        if (!updatePostRequests.modifiedCount) {
            return res.status(400).send('requst not added :(')
        }
        const addThePostToCartOfuser = await User.updateOne({ _id: ownerOfRequst },
            { "$push": { "cartOfAdoption": postId } },
            { "new": true, "upsert": true },
        )
        if (!addThePostToCartOfuser.modifiedCount) {
            return res.status(400).send('requst not added to cart :(')
        }
        return res.send('post added successfully')
    } catch (ex) {
        return res.status(400).send(`${ex.message}`)
    }

})


router.put('/update/deleteadoptrequest', authMiddleware, async (req, res) => {
    const { postId } = req.body
    if (!postId) return res.status(400).send('postid not found')
    try {
        const ownerOfRequst = req.user._id
        const checkIfUserAddReq = await Post.findOne({_id : postId})
        if(checkIfUserAddReq) {
            const postreqs = checkIfUserAddReq._doc.adoptionRequests
            let cur = [...postreqs]
            let fg = false
            cur.forEach(item => {
                if(item == ownerOfRequst) {
                    fg = 1
                    return
                }
            })
            if(!fg) return res.status(400).send('the request not founded')
        }
        const updatePostRequests = await Post.updateOne({ _id: postId },
            { "$pull": { "adoptionRequests": ownerOfRequst } },
            { "new": true, "upsert": true },
        )
        if (!updatePostRequests.modifiedCount) {
            return res.status(400).send('requst not deleted :(')
        }
        const addThePostToCartOfuser = await User.updateOne({ _id: ownerOfRequst },
            { "$pull": { "cartOfAdoption": postId } },
            { "new": true, "upsert": true },
        )
        if (!addThePostToCartOfuser.modifiedCount) {
            return res.status(400).send('requst not delteed from cart :(')
        }
        return res.send('post deleted successfully')
    } catch (ex) {
        return res.status(400).send(`${ex.message}`)
    }

})
router.put("/update/adopte", authMiddleware, async (req , res) => {
    const {adopted, postId} = req.body
    if(!adopted || !postId) return res.status(400).send('adopt state not found :(')

    try {
        const changeState = await Post.updateOne({_id : postId}, {adopted})
        if(!changeState.modifiedCount) {
            return res.status(400).send('adoption state didnot updated:(')
        }
        return res.send('state updated')
    } catch (ex) {
        return res.status(400).send(`${ex.message}`)
    }
})
module.exports = router

// { "$pull": { "arr": newelement } },
//             { "new": true, "upsert": true },

// { "$pull": { "arr": nameoftheelement } },
//             { "new": true, "upsert": true },