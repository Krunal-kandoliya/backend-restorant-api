const userModel = require("../models/userModel")
const bcrypt=require('bcryptjs')


const getuserController=async(req,res)=>{
try {
const user=await userModel.findById({_id:req.body.id},{_id:0})
if(!user){
    return res.status(404).send({
        success:false,
        message:"User NOt Found"
    })
}
user.password=undefined
res.status(200).send({
    success:true,
    message:"User Data Get Successfully",
    user
})
} catch (error) {
   console.log(error) 
   return res.status(500).send({
    success:false,
    message:"Error in Get User api",
    error
   })
}
}

const updateuserController=async(req,res)=>{
try {
    const user=await userModel.findById({_id:req.body.id})
    if(!user){
        return res.status(404).send({
            success:false,
            message:"user NOt Found"
        })
    }
    const{username,address,phone}=req.body
    if(username)user.username=username
    if(address)user.address=address
    if(phone)user.phone=phone
    await user.save()
    res.status(200).send({
        success:true,
        message:'user Update succesfull'
    })
} catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        message:"Error In UPdate User Api",
        error
    })
}
}

const updatepasswordController = async (req, res) => {
    try {
        const user = await userModel.findById({ _id: req.body.id })
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User Not Found"
            })
        }

        const { oldpassword, newpassword } = req.body
        if (!oldpassword || !newpassword) {
            return res.status(500).send({
                success: false,
                message: "Please provide old or new password"
            })
        }

        const isMatch = await bcrypt.compare(oldpassword, user.password)
        if (!isMatch) {
            return res.status(500).send({
                success: false,
                message: "Invalid credentials"
            })
        }

        const salt = await bcrypt.genSalt(10)  
        const hashed = await bcrypt.hash(newpassword, salt)
        user.password = hashed
        await user.save()

        res.status(200).send({
            success: true,
            message: "Update password successful"
        })
    } catch (error) {
        console.error(error)
        res.status(500).send({
            success: false,
            message: "Error in updating password"
        })
    }
}

const resetpassController=async(req,res)=>{
try {
    const{email,newpassword,answer}=req.body
    if(!email || !newpassword || !answer){
        return res.status(404).send({
            success:false,
            message:"Please Provide all the filds"
        })
    }
    const user=await userModel.findOne({email,answer})
    if(!user){
        return res.status(500).send({
            success:false,
            message:"User Not Fouhnd Ot invalid answer"
        })
    }
    var salt=bcrypt.genSaltSync(10)
    const hashed=await bcrypt.hash(newpassword,salt)
user.password=hashed
await user.save()
res.status(200).send({
    success:true,
    message:"passworf reset succesfull"
})
} catch (error) {
   console.log(error)
   res.status(500).send({
    success:false,
    message:"Error in Password reset Api"
   }) 
}
}

const deleteuserController=async(req,res)=>{
    try {
      await userModel.findByIdAndDelete(req.params.id)
       return res.status(200).send({
        success:true,
        message:"Your Account has Been Deleted"
       })
    } catch (error) {
       console.log(error)
       res.status(500).send({
        success:false,
        message:"Error In delted User Api"
       }) 
    }
}

module.exports={getuserController,updateuserController,updatepasswordController,resetpassController,deleteuserController}