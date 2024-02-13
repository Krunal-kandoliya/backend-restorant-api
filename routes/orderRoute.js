const express=require('express')

const router=express.Router()

const authMiddlerware = require('../middleware/authMiddlerware')
const { createorderController, orderstatus } = require('../controllers/orderController')
const adminMiddlerware = require('../middleware/adminMiddlerware')

router.post('/create',authMiddlerware,createorderController)

router.put('/orderstatus/:id',authMiddlerware,adminMiddlerware,orderstatus)

module.exports=router