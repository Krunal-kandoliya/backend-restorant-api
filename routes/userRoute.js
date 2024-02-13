const express=require('express')
const { getuserController, updateuserController, updatepasswordController, resetpassController, deleteuserController } = require('../controllers/userController')
const authMiddlerware = require('../middleware/authMiddlerware')
const router=express.Router()

router.get('/get-user',authMiddlerware,getuserController)


router.put('/update-user',authMiddlerware,updateuserController)

router.post('/update-pass',authMiddlerware,updatepasswordController)

router.post('/reset-pass',authMiddlerware,resetpassController)

router.delete('/delete/:id',authMiddlerware,deleteuserController)




module.exports=router