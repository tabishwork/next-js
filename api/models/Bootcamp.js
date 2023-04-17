const mongoose=require('mongoose')
const slugify=require('slugify')
const geocoder = require('../utils/geocoder')


const BootcampSchema=mongoose.Schema({
    name:{
        type:String,
        require:[true,'please enter bootcamp name'],
        unique:true,
        trim:true
    },
    slug: String,

    description:{
        type:String,
        require:[true,'please enter bootcamp description'],
     
    },
    website:{
        type:String,
        match:  [
            /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
            'Please use a valid url with HTTP or HTTPS'
        ]
    },
    phone:{
        type:Number,

    },
    email:{
        type:String,
        match:[
            /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
            'please add valid email'
        ]
    },
    address:{
        type:String,
        required:[true, 'Please add  an address']
    },
    location: {
        type: {
          type: String, // Don't do `{ location: { type: String } }`
          enum: ['Point'], // 'location.type' must be 'Point'
          // required: true
        },
        coordinates: {
          type: [Number],
          // required: true
        },
        formattedAddress: String,
        street: String,
        city: String,
        state: String,
        zipcode: String,
        country:String
      },
      careers: {
        type: [String],
        required:true,
        enum: [
            'Web Development',
            'Mobile Development',
            'UI/UX',
            'Data Science',
            'Business',
            'Others'
        ]
      },
      averageRating: {
        type:Number,
        min: [1,'Rating must me atleast 1'],
        max: [5,'Rating must me below 6'],
      },
      averageCost: {
        type:Number,
      },
      photo: {
        type:String,
        default: 'no-photo.jpg'
      },
      housing:{
        type:Boolean,
        default:false
      },
      jobAssistance:{
        type:Boolean,
        default:false
      },
      jobGurantee:{
        type:Boolean,
        default:false
      },
      acceptGi:{
        type:Boolean,
        default:false
      },
      

      createdAt: {
        type: Date,
        default:Date.now()

      },
      user: {
        type:mongoose.Schema.ObjectId,
        ref: 'User',  
      }

},{
  toJSON: { virtuals:true},
  toObject: { virtuals:true}
})
//slug
BootcampSchema.pre('save', function(next){
  this.slug=slugify(this.name,{lower:true})
  next()
})

//geocoder and getting the location
BootcampSchema.pre('save',async function (next){
console.log(geocoder);
   const loc = await geocoder.geocode(this.address)
   this.location={
    type: 'Point',
    coordinates: [loc[0].longitude,loc[0].latitude],
    formattedAddress: loc[0].formattedAddress,
    street: loc[0].streetName,
    city: loc[0].city,
    state: loc[0].state,
    zipcode: loc[0].zipcode,
    country: loc[0].countryCode,
   }

   //do not save address in db
   this.address=undefined


  next()
})

//cascade delete courses whwn a bootcamp is deleted
BootcampSchema.pre('remove',async function (next) {
   await this.model('Course').deleteMany({ bootcamp:this._id})
   next()
})



//Reverse populate with virtuals
BootcampSchema.virtual('courses',{
  ref: 'Course',
  localField: '_id',
  foreignField: 'bootcamp',
  justOne: false 
})

module.exports=mongoose.model('Bootcamp',BootcampSchema)