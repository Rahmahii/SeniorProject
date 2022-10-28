const express= require('express')
const bodyParser=require('body-parser')
const app=express()


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))


const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions))

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

const categoryRoute=require('./routes/category.route')
app.use("/category",categoryRoute)

const dashboardRoute=require('./routes/dashboard')
app.use("/dashboard",dashboardRoute)

module.exports=app