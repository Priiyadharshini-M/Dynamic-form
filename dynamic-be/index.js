const mongoose = require('mongoose')
const express = require("express")
const cors=require('cors')
require('dotenv/config')
const user = require("./Routers/userRouter")

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect(process.env.DB_STRING)
    .then(() => {
        console.log('Database Connected')  
    })
    .catch((err) => { console.log(err) }) 

app.use('/user',user)

app.listen(process.env.PORT, () => {
    console.log('Server is running at port :', process.env.PORT)
})