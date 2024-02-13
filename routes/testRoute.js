const express=require('express')
const { testUser } = require('../controllers/testController')
const router=express.Router()


router.get('/test-user',testUser)


module.exports=router