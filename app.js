const express= require('express')
const bodyParser=require('body-parser')
const app=express()
app.use(bodyParser.json())

const userRoute=require('./routes/user.route')
app.use("/user",userRoute)

const storeRoute=require('./routes/store.route')
app.use("/store",storeRoute)

module.exports=app