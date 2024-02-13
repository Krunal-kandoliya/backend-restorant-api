const express=require('express')
const colors=require('colors')
const cors=require('cors')
const morgan=require('morgan')
const dotenv=require('dotenv')
const connectDB = require('./config/db')

dotenv.config()
connectDB()
const app=express()

app.use(cors())
app.use(express.json())
app.use(morgan("dev"))

app.use('/api/v1/test',require('./routes/testRoute'))
app.use('/api/v1/auth',require('./routes/authRoute'))
app.use('/api/v1/user',require('./routes/userRoute'))
app.use('/api/v1/restro',require('./routes/restaurantRoute'))
app.use('/api/v1/category',require('./routes/categoryRoute'))
app.use('/api/v1/food',require('./routes/foodRoute'))
app.use('/api/v1/order',require('./routes/orderRoute'))

app.get('/',(req,res)=>{
 return res.status(200).send("<h1>Hello Krunal</h1>")
})

app.listen(process.env.PORT,()=>{
console.log(`Server Is running ${process.env.PORT}`.bgRed)
})