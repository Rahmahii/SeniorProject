const express= require('express')
const bodyParser=require('body-parser')
const app=express()
app.use(bodyParser.json())

const userRoute=require('./routes/user.route')
app.use("/user",userRoute)

module.exports=app