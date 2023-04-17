const express = require('express')
const { registerUser, loginUser, getMe, forgotPassword, logout } = require('../controllers/authController')
const router=express.Router()




router.post('/register',registerUser)
router.post('/login',loginUser)
router.get('/logout',logout)
router.get('/me',getMe)
router.post('/forgotPassword',forgotPassword)





module.exports=router