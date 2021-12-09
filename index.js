const express = require('express')
const app = express();



app.get('/' , (req , res)=>{

  res.send({
      omad :"dkcjmdskcm"
  })

})

const PORT = process.env.PORT || 5050

app.listen(PORT, () => {
    console.log(`app is ruuning on ${PORT}`)

})