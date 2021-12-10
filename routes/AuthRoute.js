const router = require('express').Router()
const {User, validateLogin, validateSignUp} = require('../models/userModel')

const {geneAuthToken} = require('../helper')

// userName
// email
// id,
// password,
// userImg
// phoneNumber

router.post('/signup', async (req, res) => {
    const {userName , email, password, role} = req.body
    if(!userName || !email || !password) return res.status(400).send('please fill needed info')
    try {
        const {error} = validateSignUp({userName, email, password})
        if(error) {
            return res.status(400).send(`try make email valid and password more than 3 digits,,, ${error.message}`)
        }

        const userFound = await User.findOne({email})
        if(userFound) return res.status(400).send('try another email...')

        const newuser = new User({userName, email, password ,role})
        const save = await newuser.save()
        return res.send({
            ...(save._doc), password : ''
        })
    } catch (ex) {
        return res.status(400).send(ex.message)
    }
})

router.post('/login', async (req, res) => {

    const {password, email} = req.body
    if(!password || !email) {

        return res.status(400).send('email and pass required')
    }
    try {
        const userFound = await User.findOne({email, password})
        if(userFound) {
            const resToken = await geneAuthToken(userFound._doc._id)
            res.setHeader('x-auth-token' , resToken)
            return res.send({...(userFound._doc), password : '', resToken})
        }
        return res.status(400).send('user Not Found')

    } catch (ex) {
        return res.status(400).send(`${ex.message} fron catch`)
    }

})

module.exports = router