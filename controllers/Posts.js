const {Post} = require('../models/PostModel')

async function addPost(post) {
    const newPost = new Post(post)
    const postRes = await newPost.save()
    return postRes._doc
}


module.exports = {addPost}