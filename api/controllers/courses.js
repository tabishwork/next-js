const errorResponse= require("../utils/errorResponse.js")
const asyncHandler=require('../middlewares/async.js')
const Course = require('../models/Course.js')
const Bootcamp = require('../models/Bootcamp.js')



// get all Courses
//route    GET   /api/v1/bootcamps
//access   public

exports.getCourses=asyncHandler(async(req,res,next)=>{
    let query

    if(req.params.bootcampId){
        query=Course.find({bootcamp:req.params.bootcampId})
    }else{
        query=Course.find()
    }

    const courses= await query

    res.status(200).json({
        success:true,
        count: courses.length,
        data:courses
    })
})
// get single Courses
//route    GET   /api/v1/courses/id
//access   public

exports.getSingleCourse=asyncHandler(async(req,res,next)=>{
   
    const course = await Course.findById(req.params.id).populate({

        path:'bootcamp',
        select: 'name description'
    }
        )

    if(!course){
        return next(
            new errorResponse('no course found with id',404)
        )
    }

    res.status(200).json({
        success:true,
       
        data:course
    })
})
// Post single Courses
//route    POST   /api/v1/bootcamps/:bootcampId/cpurse
//access   private

exports.postNewCourse=asyncHandler(async(req,res,next)=>{
     
    req.body.bootcamp= req.body.bootcampId
    req.body.user=req.user.id
     
    const bootcamp = await Bootcamp.findById(req.body.bootcampId)
    if(!bootcamp){
        return next(
            new errorResponse('no bootcamp found with id',404)
        )
    }
    // Make sure user is bootcamp owner 
  if(bootcamp.user.toString() !==req.user.id && (req.user.role !== 'admin' || req.user.role !== 'publisher')){
    return next(
      new errorResponse('user id is not authorized to add a course',400)
    )
  }

    const course = await Course.create(req.body)
    

    res.status(200).json({
        success:true,
       
        data:course
    })
})
// Update single Courses
//route    PUT   /api/v1/courses/id
//access   private

exports.updateCourse=asyncHandler(async(req,res,next)=>{
     
    
     
    const course = await Course.findByIdAndUpdate(req.params.id,req.body,{new:true,
     runValidators:true})
    if(!course){
        return next(
            new errorResponse('no course found with id',404)
        )
    }
      //Make sure user is course owner 
  if(course.user.toString() !==req.user.id && req.user.role !== 'admin'){
    return next(
      new errorResponse('user id is not authorized to updates',400)
    )
  }


    res.status(200).json({
        success:true,
       
        data:course
    })
})
// Delete single Courses
//route    DELETE   /api/v1/courses/id
//access   private

exports.deleteCourse=asyncHandler(async(req,res,next)=>{
     
    
     
    const course = await Course.findByIdAndDelete(req.params.id)
    if(!course){
        return next(
            new errorResponse(('no course found with id'),404)
        )
    }
        //Make sure user is course owner 
  if(course.user.toString() !==req.user.id && req.user.role !== 'admin'){
    return next(
      new ErrorResponse('user id is not authorized to delete course',400)
    )
  }


    res.status(200).json({
        success:true,
       
        message:"course deleted successfully"
    })
})