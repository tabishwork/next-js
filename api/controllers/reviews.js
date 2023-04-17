const errorResponse= require("../utils/errorResponse.js")
const asyncHandler=require('../middlewares/async.js')
const Review = require('../models/Review.js')
const Bootcamp = require('../models/Bootcamp.js')
const ErrorResponse = require("../utils/errorResponse.js")


// get    Reviews
//route    GET   /api/v1/reviews
//access   public

exports.getReviews=asyncHandler(async(req,res,next)=>{
    if(req.params.bootcampId){
        const reviews=await Review.find({bootcamp:req.params.bootcampId})
      
        res.status(200).json({
            success:true,
            count: reviews.length,
            data:reviews
        })
    }else{
        res.status(200).json(res.advanceResults)
    }
  
})



// get    Single Reviews
//route    GET   /api/v1/reviews/id
//access   public

exports.getReview=asyncHandler(async(req,res,next)=>{
  const review=await Review.findById(req.params.id).populate({
    path: 'bootcamp',
    select:'name description'
  })
  if(!review){
    return next(new errorResponse('no review found with id'),404)
  }
  res.status(200).json({
    success:true,
    data:review
 
  })
})
// Post   add Reviews
//route    Post   /api/v1/bootcamps/:bootcampId/reviews
//access   private

exports.addReview=asyncHandler(async(req,res,next)=>{
  req.body.bootcamp=req.params.bootcampId
  req.body.user= req.user.id
  
  const bootcamp=await Bootcamp.findById(req.params.bootcampId)

  if(!bootcamp){
    return next(new ErrorResponse('no bootcamp found with given id',404))
  }

  const review=await Review.create(req.body)

  res.status(201).json({
    success:true,
    data: review
  })

})
// Update   Reviews
//route    Put   /api/v1/reviews/:id
//access   private

exports.updateReview=asyncHandler(async(req,res,next)=>{
  
  let review=await Review.findById(req.params.id)

  if(!review){
    return next(new ErrorResponse('no review found with given id',404))
  }

  //Make sure review belongs to user
  if(review.user.toString() !==req.user.id && req.user.role !== 'admin' ){

    return next(new ErrorResponse('Not authorized',401))

  }

  review = await Review.findByIdAndUpdate(req.params.id,req.body,{
    new:true,
    runValidators:true
  })

  

  res.status(201).json({
    success:true,
    data: review
  })

})
// Delete   Review
//route    Delete  /api/v1/reviews/:id
//access   private

exports.deleteReview=asyncHandler(async(req,res,next)=>{
  
  let review=await Review.findById(req.params.id)

  if(!review){
    return next(new ErrorResponse('no review found with given id',404))
  }

  //Make sure review belongs to user
  if(review.user.toString() !==req.user.id && req.user.role !== 'admin' ){

    return next(new ErrorResponse('Not authorized',401))

  }

  review = await review.remove()

  

  res.status(201).json({
    success:true,
    message: "review successfully deleted"
  })

})
