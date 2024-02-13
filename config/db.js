const mongoose=require('mongoose')
const color=require('colors')

const connectDB=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`Conncted to Database ${mongoose.connection.host}`.bgYellow)
    } catch (error) {
        console.log('DB ERROR',error,color.bgBlue)
    }
}

module.exports=connectDB