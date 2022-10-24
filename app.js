const express= require('express')
const bodyParser=require('body-parser')
const app=express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
const path = require('path')

app.use(express.static(path.join(__dirname)))

const userRoute=require('./routes/user.route')
app.use("/user",userRoute)

const storeRoute=require('./routes/store.route')
app.use("/store",storeRoute)

const productRoute=require('./routes/product.route')
app.use("/product",productRoute)

const invoiceRoute=require('./routes/invoice.route')
app.use("/invoice",invoiceRoute)

const cardRoute=require('./routes/card.route')
app.use("/card",cardRoute)

module.exports=app