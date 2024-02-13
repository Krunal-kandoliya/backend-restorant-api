const orderModel = require("../models/orderModel");

const createorderController=async(req,res)=>{
try {
  const{cart}=req.body 
  if(!cart ){
    return res.status(500).send({
        success:false,
        message:"Please Food Cart Or PAyment method"
    })
  }
  let total=0
  cart.map((e)=>{
    total += e.price
  }) 
  const neworder=new orderModel({
    foods:cart,
    payment:total,
    buyer:req.body.id
  })
  await neworder.save()
  res.status(201).send({
    success:true,
    message:"Order Placed Succesfull",
    neworder
  })
} catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        message:"Error In Order Api"
    })
}
}

const orderstatus=async(req,res)=>{
    try {
        const{id}=req.params
        const {status}=req.body
        if(!id){
            return res.status(404).send({
                success:false,
                message:"please Order id Given"
            })
        }
        const order=await orderModel.findByIdAndUpdate(id,{status},{new:true})
        res.status(200).send({
            success:true,
            message:"order status succesfully"
        })

    } catch (error) {
      console.log(error)
      res.status(500).send({
        success:false,
        message:"Order status not found"
      })  
    }
}

module.exports={createorderController,orderstatus}