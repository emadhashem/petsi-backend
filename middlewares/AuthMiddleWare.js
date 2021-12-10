const jwt = require('jsonwebtoken')

const {verefAuthToken} = require('../helper')
module.exports = function (req , res , next) {
    const token = req.header('x-auth-token')
    if(!token) return res.status(401).send('access denied')
    // const blackToken = blackList.find(item => item == token)
    // if(blackToken) res.status(401).send('denied')
    try {
        const verf = jwt.verify(token , process.env.JWT_SECRET)
        req.user = {verf , token}
        next()
    } catch (ex) {
        res.status(400).send('not valid token' + `${ex.message}`)
    }
}