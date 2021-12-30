
const jwt = require('jsonwebtoken')


async function geneAuthToken(_id = "") {
    const token = jwt.sign({ _id }, process.env.JWT_SECRET,
        {
            expiresIn: "10m"
        });
    return token
}

async function verefAuthToken(token = "") {
    const verf = jwt.verify(token, process.env.JWT_SECRET)
    return verf
}

module.exports = { geneAuthToken, verefAuthToken }
