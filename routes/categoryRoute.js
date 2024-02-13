const express=require('express')
const authMiddlerware = require('../middleware/authMiddlerware')
const { createcatController, getallcatController, updatecatController, deletecatController } = require('../controllers/categoryController')
const router=express.Router()


router.post("/create",authMiddlerware,createcatController)

router.get("/getallcat",getallcatController)

router.put('/update/:id',authMiddlerware,updatecatController)

router.delete("/delete/:id",authMiddlerware,deletecatController)



module.exports=router

