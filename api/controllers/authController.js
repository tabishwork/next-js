const ErrorResponse= require("../utils/errorResponse.js")
const asyncHandler=require('../middlewares/async.js')
const User = require('../models/User.js')


//desc   Register user
//route   Post /api/v1/auth/register
//access  Public

exports.registerUser = asyncHandler(async (req,res,next)=>{
    const {name,email,password, role} =req.body

    //Create user
    const user= await User.create({
        name,
        email,
        password,
        role
    })

    sendTokenResponse(user,200,res)
    
})
//desc   login  user
//route   Post /api/v1/auth/login
//access  Public

exports.loginUser = asyncHandler(async (req,res,next)=>{
    const {email,password} =req.body

    //Validate email and password
    if(!email || !password){
        return next(new ErrorResponse('Please provide correct email and password',404))
    }
    const user=await User.findOne({email}).select('+password')
    if(!user){
        return next(new ErrorResponse('User not found',404))
    }

    const isMatch=await user.matchPassword(password)
    if(!isMatch){
        return next(new ErrorResponse('Invalid password',401))
    }


   sendTokenResponse(user,200,res)
})


//Get token from model,create cookie and send response 
const sendTokenResponse = (user,statusCode,res)=>{
   
    //Create token
    const token=user.getSignedJwtToken()

    const options={
        expires: new Date(Date.now()+ process.env.JWT_COOKIE*24*60*60*1000),
        httpOnly: true
    }
    
    res.status(statusCode).cookie('token',token,options).json({
        success:true,
        data:user,
        token
    })
}


//desc   Get curent login  user
//route   Post /api/v1/auth/me
//access  Private

exports.logout = asyncHandler(async (req,res,next)=>{
     
    res.cookie('token',null,{
        expires:new Date(Date.now()),
        httpOnly:true
    })
    
    res.status(200).json({
        success:true,
        message:"user logged out"
    })
})
//desc   Get curent login  user
//route   Post /api/v1/auth/me
//access  Private

exports.getMe = asyncHandler(async (req,res,next)=>{
    const user = await User.findById(req.user.id)
    
    res.status(200).json({
        success:true,
        data:user
    })
})
//desc   Forgot password
//route   Post /api/v1/auth/forgotpassword
//access  public

exports.forgotPassword = asyncHandler(async (req,res,next)=>{
    const user = await User.findOne({email: req.body.email})
    
    if(!user){
        return next(new ErrorResponse('There is no user with this email',404))

    }

    //Get reset token
    const resetToken=user.getResetPasswordToken()

    await user.save({validateBeforeSave:false})
    res.status(200).json({
        success:true,
        data:user
    })
})