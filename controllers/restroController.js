const restarantModel = require("../models/restarantModel");

const createrestroController = async (req, res) => {
  try {
    const {
      title,
      imageurl,
      foods,
      time,
      pickup,
      delivery,
      isopen,
      logourl,
      rating,
      ratingCount,
      code,
      coords,
    } = req.body;
    if(!title || !coords){
        return res.status(500).send({
            success:false,
            message:"plase provide title and adress"
        })
    }
    const restos=new restarantModel({title,
        imageurl,
        foods,
        time,
        pickup,
        delivery,
        isopen,
        logourl,
        rating,
        ratingCount,
        code,
        coords,
    })
    await restos.save()
    res.status(200).send({
        success:true,
        message:"New restrorant created successfully"
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Create Restro App",
      error,
    });
  }
};

const getsllrestroController=async(req,res)=>{
  try {
    const restro=await restarantModel.find({})
    if(!restro){
      return res.status(404).send({
        success:false,
        message:"no restrorant available"
      })
    }
    res.status(200).send({
      success:true,
      message:"feched succesful",
      totalrestorant:restro.length,
      restro
    })
  } catch (error) {
    
  }
}

const getrestrobyidController=async(req,res)=>{
try {
  const restro=await restarantModel.findById(req.params.id)
  if(!restro){
    return res.status(404).send({
      sucess:false,
      message:"Restrorants not Found"
    })
  }
  res.status(200).send({
    success:true,
    message:"Feched Succesfull",
    restro
  })
} catch (error) {
  console.log(error)
  res.status(500).send({
    success:false,
    message:"something went wrong",
    error
  })
}
}

const deleterestroController=async(req,res)=>{
  try {
    const restro=await restarantModel.findByIdAndDelete(req.params.id)
    if(!restro){
      return res.status(404).send({
        success:false,
        message:"restro not found"
      })
    }
    res.status(200).send({
      success:true,
      message:"Deleted Succeasfull"
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success:false,
      message:"Not deleted"
    })
  }
}

module.exports = { createrestroController,getsllrestroController,getrestrobyidController,deleterestroController };
