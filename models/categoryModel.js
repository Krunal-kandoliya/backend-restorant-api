const mongoose=require('mongoose')

const categoryrestro=new mongoose.Schema({
    title:{
        type:String,
        required:[true,'category title is required']
    },
    imageurl:{
type:String,
default:'https://image.similarpng.com/very-thumbnail/2021/09/Good-food-logo-design-on-transparent-background-PNG.png'
    }
},{timestamps:true})

module.exports=mongoose.model("Category",categoryrestro)