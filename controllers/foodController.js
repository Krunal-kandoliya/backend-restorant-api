const foodModel = require("../models/foodModel");

const createfoodController = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      imageurl,
      foodtags,
      category,
      code,
      isavaliable,
      restarant,
      rating,
    } = req.body;
    if (!title || !description || !price || !restarant) {
      return res.status(500).send({
        success: false,
        message: "please provide all the fields",
      });
    }
    const newfood = new foodModel({
      title,
      description,
      price,
      imageurl,
      foodtags,
      category,
      code,
      isavaliable,
      restarant,
      rating,
    });
    await newfood.save();
    res.status(201).send({
      success: true,
      message: "New Food Created Succesfull",
      newfood,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Eror in create food api",
      error,
    });
  }
};

const getallfoodController = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    if (!foods) {
      return res.status(404).send({
        success: false,
        message: "No Foods items Was Found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Get All Foods Succesfull",
      totalfood: foods.length,
      foods,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get all api",
    });
  }
};

const singlefoodController = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).send({
        success: false,
        message: "Plaease Provide ID",
      });
    }
    const food = await foodModel.findById(id);
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "Not food in this id",
      });
    }
    res.status(200).send({
      success: true,
      message: "Succesfully Fetched Single foods",

      food,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Single Food Not fetched",
    });
  }
};

const singlefoodbyrestroController = async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(404).send({
          success: false,
          message: "Plaease Provide ID",
        });
      }
      const food = await foodModel.find({restarant:id});
      if (!food) {
        return res.status(404).send({
          success: false,
          message: "Not food in this id",
        });
      }
      res.status(200).send({
        success: true,
        message: "Succesfully Fetched Single foods",
  
        food,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Single Food Not fetched",
      });
    }
  };

  const updatefoodController=async(req,res)=>{
    try {
        const{id}=req.params
        if(!id){
            return res.status(404).send({
                success:false,
                message:"NO food id avaliable"
            })
        }
const food=await foodModel.findById(id)
if(!food){
    return res.status(404).send({
        success:false,
        message:"NO Food Available in this ID"
    })
}
const{
    title,
    description,
    price,
    imageurl,
    foodtags,
    category,
    code,
    isavaliable,
    restarant,
    rating
}=req.body
const updatefood=await foodModel.findByIdAndUpdate(id,{
    title,
    description,
    price,
    imageurl,
    foodtags,
    category,
    code,
    isavaliable,
    restarant,
    rating
},{new:true})
res.status(200).send({
    success:true,
    message:"update food succesfull",
    updatefood
})
    } catch (error) {
       console.log(error)
       res.status(500).send({
        success:false,
        message:"Error in Update api"
       }) 
    }
  }

  const deletefoodController=async(req,res)=>{
    try {
      const{id}=req.params
if(!id){
  return res.status(404).send({
    success:false,
    message:"Please Provide ID"
  })
}
const food=await foodModel.findById(id)
if(!food){
  return res.status(404).send({
    success:false,
    message:"NO Specific Food Exist in This ID"
  })
}
await foodModel.findByIdAndDelete(food)
res.status(200).send({
  success:true,
  message:"Delete Food Succesfully"
})
    } catch (error) {
      console.log(error)
      res.status(500).send({
        success:false,
        message:"The Food NOt DEleted"
      })
    }
  }

module.exports = {
  createfoodController,
  getallfoodController,
  singlefoodController,
  singlefoodbyrestroController,
  updatefoodController,
  deletefoodController
};
