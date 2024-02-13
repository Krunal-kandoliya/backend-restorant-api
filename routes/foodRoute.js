const express=require('express')
const authMiddlerware = require('../middleware/authMiddlerware')
const { createfoodController, getallfoodController, singlefoodController, singlefoodbyrestroController, updatefoodController, deletefoodController } = require('../controllers/foodController')
const router=express.Router()


router.post('/create',authMiddlerware,createfoodController)

router.get('/getall',getallfoodController)
router.get('/getsingle/:id',singlefoodController)
router.get('/getsinglefoodbyresto/:id',singlefoodbyrestroController)
router.put('/updatefood/:id',authMiddlerware,updatefoodController)
router.delete('/deletefood/:id',authMiddlerware,deletefoodController)


module.exports=router

