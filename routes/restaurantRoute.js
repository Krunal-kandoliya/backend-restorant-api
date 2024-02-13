const express=require('express')
const authMiddlerware = require('../middleware/authMiddlerware')
const { createrestroController, getsllrestroController, getrestrobyidController } = require('../controllers/restroController')
const router=express.Router()


router.post('/create',authMiddlerware,createrestroController)

router.get('/getall',getsllrestroController)

router.get('/get/:id',getrestrobyidController)

router.delete('/delete/:id',authMiddlerware,)


module.exports=router