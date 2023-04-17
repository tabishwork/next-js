const ErrorResponse= require("../utils/errorResponse.js")
const asyncHandler=require('../middlewares/async.js')
const User = require('../models/User.js')



//desc    get all user
//route   Get /api/v1/auth/users
//access  Private/admin

exports.getAllUser = asyncHandler(async (req,res,next)=>{
   
    res.status(200).json(res.advanceResults)
    
})
//desc    get single user
//route   Get /api/v1/auth/users/:id
//access  Private/admin

exports.getSingleUser = asyncHandler(async (req,res,next)=>{
   
   const user =await User.findById(req.params.id) 
    res.status(200).json({
        success:true,
        data:user
    })
    
})
//desc    create a  user
//route   Post /api/v1/auth/users
//access  Private/admin

exports.createUser = asyncHandler(async (req,res,next)=>{
   
   const user =await User.create(req.body) 
    res.status(201).json({
        success:true,
        data:user
    })
    
})
//desc    update a  user
//route   Put /api/v1/auth/users
//access  Private/admin

exports.updateUser = asyncHandler(async (req,res,next)=>{
   
   const user =await User.findByIdAndUpdate(req.params.id,req.body,{
      new:true,
      runValidators:true
   }) 
    res.status(200).json({
        success:true,
        data:user
    })
    
})
//desc    delete a  user
//route   Delete /api/v1/auth/users
//access  Private/admin

exports.deleteUser = asyncHandler(async (req,res,next)=>{
   
   await User.findByIdAndDelete(req.params.id) 
    res.status(200).json({
        success:true,
        message:"successfully deleted"
    })
    
})