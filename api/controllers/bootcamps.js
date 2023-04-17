const path =require('path')
const errorResponse= require("../utils/errorResponse.js")
const asyncHandler=require('../middlewares/async.js')
const Bootcamp = require('../models/Bootcamp.js')
const { geoSearch } = require("../models/Bootcamp.js")
const geocoder = require("../utils/geocoder.js")
const ErrorResponse = require('../utils/errorResponse.js')


// get all bootcamps
//route    GET   /api/v1/bootcamps
//access   public
exports.getBootcamps=asyncHandler(async(req,res,next)=>{

  res.status(201).json(res.advanceResults)
})

//desc     Get single bootcamps
//route    GET   /api/v1/bootcamps/:id
//access   public
exports.getSingleBootcamps=asyncHandler( async(req,res,next)=>{
  
    const bootcamps= await Bootcamp.findById(req.params.id)
    if(!bootcamps){
      next(err)
    }

    res.status(201).json({
      success:true,
      data:bootcamps
    })
    
    
   
  
})


//desc   post new bootcamps
//route    post   /api/v1/bootcamps
//access   private
exports.postBootcamps=asyncHandler( async(req,res,next)=>{
    
    
    const bootcamp= await Bootcamp.create(req.body)

    res.status(201).json({
      success:true,
      data:bootcamp
    })
 
})

//update bootcamps
//route    PT   /api/v1/bootcamps/:id
//access   private
exports.updateBootcamps=asyncHandler( async(req,res,next)=>{
    

      let bootcamp=await Bootcamp.findById(req.params.id)

        if (!bootcamp) {
           return next(
              new ErrorResponse('bootcamp not found with id',400)
            )
        }

        //Make sure user is bootcamp owner
        if(bootcamp.user.toString() !==req.user.id && req.user.role !== 'admin'){
          return next(
            new ErrorResponse('user id is not authorized to update',400)
          )
        }

        bootcamp=await Bootcamp.findByIdAndUpdate(req.params.id,req.body,{
          new:true,
          runValidators:true
        })

        res.status(200).json({
            success:true,
            data:bootcamp

        })
      
    
  

   


})

//delete bootcamps
//route    DELETE   /api/v1/bootcamps/:id
//access   delete
exports.deleteBootcamps=asyncHandler( async(req,res,next)=>{

 
    const bootcamp= await Bootcamp.findById(req.params.id)

    if (!bootcamp) {
      return next(
        new ErrorResponse('bootcamp not found with id',400)
      )
    
 }

 bootcamp.remove()
 
 res.status(200).json({
     success:true,
     message:"successfully deleted"
 
 })
  

})
//desc    GEt bootcamps in a given radius
//route    DELETE   /api/v1/bootcamps/radius/:zipcode/:distance
//access   delete
exports.getBootcampsInRadius=asyncHandler( async(req,res,next)=>{

 const {zipcode, distance}= req.params


 //Get lat/lng from geocoder
 const loc= await geocoder.geocode(zipcode)
 const lat=loc[0].latitude
 const lng =loc[0].longitude

 //calc radius using radians
 // divide dist by radius of earth
 // Earth radius = 3963 mi/6278 km
 const radius = distance/3963;

 const bootcamps=await Bootcamp.find({
  location: { $ :{ $centerSphere:[[lng,lat],radius]}}
 })

 res.status(200).json({
  success:true,
  count:bootcamps.length,
  data: bootcamps

 })
  

})



//Upload photo bootcamps
//route    PUT  /api/v1/bootcamps/:id/photo
//access   delete
exports.bootcampPhotoUpload=asyncHandler( async(req,res,next)=>{

 
  const bootcamp= await Bootcamp.findById(req.params.id)

  if (!bootcamp) {
  return next(
    new errorResponse("bootcamp not found with thne given id",404)
  )
}

if(!req.files){
  return next(
    new errorResponse("please upload file",404)
  )
}
 
const file = req.files.file

//Make sure the image is photo
if(!file.mimetype.startsWith('image')){
  return next(new errorResponse(`Please upload a image`,400))
}

//Check filesize
if(file.size>process.env.MAX_FILE_UPLOAD){
  return next(new errorResponse(`please upload image less than
  ${process.env.MAX_FILE_UPLOAD}`))
}


//Create custom filename
file.name=`photo_${bootcamp._id}${path.parse(file.name).ext}`

file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`,async err =>{
  if(err){
    return next(new errorResponse(`problem with upload`,500))
  }
  
  await Bootcamp.findByIdAndUpdate(req.params.id, {photo: file.name})

res.status(200).json({
  success:true,
  data: file.name
})

})


})