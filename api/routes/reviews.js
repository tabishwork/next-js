const express= require('express')
const Review=require('../models/Review')

const router=express.Router({mergeParams: true})

const {protect, authorize}=require('../middlewares/auth')
const { getReviews, getReview, addReview, updateReview, deleteReview } = require('../controllers/reviews')

router.get('/',getReviews)
router.post('/',protect,authorize('user','admin'),addReview)
router.put('/:id',protect,authorize('user'),updateReview)
router.delete('/:id',protect,authorize('user','admin'),deleteReview)
router.get('/:id',getReview)
module.exports=router

