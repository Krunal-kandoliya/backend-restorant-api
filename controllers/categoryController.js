const categoryModel = require("../models/categoryModel")



const createcatController=async(req,res)=>{
    try {
        const{title,imageurl}=req.body
        if(!title ){
            return res.status(500).send({
                success:false,
                message:"Plaessa provide all fields"
            })
        }
        const newcat=new categoryModel({
            title,imageurl
        })
        await newcat.save()
        res.status(201).send({
            success:false,
            message:"New Category succesfull",
            newcat
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error In Create apI",
            error
        })
    }
}

const getallcatController=async(req,res)=>{
    try {
       const getallcat=await categoryModel.find({}) 
       if(!getallcat){
        return res.status(404).send({
            success:false,
            message:"no category"
        })
       }
       res.status(200).send({
        success:true,
        message:"Succesfull All foods",
        getallcat
       })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Not Fetched"
        })
    }
}

const updatecatController=async(req,res)=>{
try {
const{id}=req.params
const{title,imageurl}=req.body
const updatecat=await categoryModel.findByIdAndUpdate(id,{title,imageurl},{new:true})
if(!updatecat){
    return res.status(500).send({
        success:false,
        message:"Not updated"
    })

}
res.status(200).send({
    success:true,
    message:"Succesfull updated category"
})
    
} catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        message:"Error in UpdATE aPI"
    })
}    
}

const deletecatController=async(req,res)=>{
    try {
       const{id}=req.params
       if(!id){
        return res.status(500).send({
            success:false,
            message:"please provide category id"
        })
       } 
       const category=await categoryModel.findById(id)
       if(!category){
        return res.status(500).send({
            success:false,
            message:"this category not exist"
        })
       }
       await categoryModel.findByIdAndDelete(id)
       res.status(200).send({
        success:true,
        message:"category deleted succesfully"
       })
    } catch (error) {
       console.log(error)
       res.status(500).send({
        success:false,
        message:"Error in delete cat api"
       }) 
    }
}


module.exports={createcatController,getallcatController,updatecatController,deletecatController}