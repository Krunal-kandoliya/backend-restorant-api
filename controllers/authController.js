const userModel = require("../models/userModel");
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')

const registerController = async (req, res) => {
  try {
    const { username, email, password, phone, address,answer } = req.body;
    if (!username || !email || !password || !phone || !address || !answer) {
      return res.status(500).send({
        success: false,
        message: "Please Provide all the fields",
      });
    }
    const existinguser = await userModel.findOne({ email });
    if (existinguser) {
      return res.status(500).send({
        success: false,
        message: "Email Already Exist Please Login",
      });
    }
    var salt=bcrypt.genSaltSync(10)
    const hashed=await bcrypt.hash(password,salt)
    const user = await userModel.create({
      username,
      email,
      password:hashed,
      address,
      phone,
      answer
    });
    res.status(201).send({
      success: true,
      message: "Succcesfully Register",
      totall:user.length,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Register Api",
      error,
    });
  }
};

const loginController=async(req,res)=>{
try {
    const {email,password}=req.body
if(!email || !password){
    return res.status(500).send({
        success:false,
        message:"Please Provide Email and Password"
    })
}
const user =await userModel.findOne({email})
if(!user){
    return res.status(404).send({
        success:false,
        message:"User Not found ",
    
    })
   
}
//comparee pass
const ismatch=await bcrypt.compare(password,user.password)
if(!ismatch){
    return res.status(500).send({
        success:false,
        message:"invalid Crendcail"
    })
}
const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{
    expiresIn:'7d'
})
user.password=undefined
res.status(200).send({
    success:true,
    message:"Login Succesfull",
    token,
    user
})
} catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        message:"Error in Login Api",
        error
    })
}
}



module.exports = { registerController,loginController };
