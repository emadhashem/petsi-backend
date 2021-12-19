const express = require('express')
const app = express();
require("dotenv").config();
/** middleware staff */
const cors = require('cors')
app.use(cors())
const morgan = require('morgan')
app.use(morgan('dev'))
app.use(express.json())
/**  */



const URI_MONGO = 'mongodb+srv://obito:1234omda@cluster0.diz3h.mongodb.net/petsi?retryWrites=true&w=majority'
const mongoose = require('mongoose')

mongoose.connect(URI_MONGO)
.then(() => console.log('connected to the database'))
.catch(e => console.log(`faild to connect cuz \n\n ${e}`))

/** routes */
const authRoute = require('./routes/AuthRoute')
const postRoute = require('./routes/PostRoute')
const userRoute = require('./routes/UserRoute')
const adminRoute = require('./routes/adminRoute')
const reviewRoute = require('./routes/reviewRoute')
/** */
/** routes */
app.use('/api/auth', authRoute)
app.use('/api/post', postRoute)
app.use('/api/user', userRoute)
app.use('/api/admin', adminRoute)
app.use('/api/review', reviewRoute)
/** */
const PORT = process.env.PORT || 5050

app.listen(PORT, () => {
    console.log(`app is ruuning on ${PORT}`)

})