const express= require('express')
const { getAllUser, getSingleUser, createUser, updateUser, deleteUser } = require('../controllers/users')


const User=require('../models/User')
const advanceResults = require('../middlewares/advanceResults')
const { protect, authorize } = require('../middlewares/auth')

const router= express.Router({mergeParams: true})

router.use(protect)
router.use(authorize('admin'))

router.get('/',advanceResults(User),getAllUser)
router.get('/:id',getSingleUser)
router.post('/',protect,createUser)
router.put('/:id',updateUser)
router.delete('/:id',protect,deleteUser)






module.exports=router