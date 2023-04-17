const errorResponse=require("../utils/errorResponse.js")


const errorHandler= (err,req,res,next)=>{
      let error={...err}
      error.message = err.message
      console.log(error)

      //wrong id error
    if(err.name === 'CastError'){
       let message = "response not found with then given id"
       error= new errorResponse(message,404)
    }

    //Mongoose duplicate key error
    if(err.code===11000){
        let message = "duplicate key error"
        error= new errorResponse(message,400)
    }

    //Mongoose validator error
    if(err.name==='ValidationError'){
        const message= Object.values(err.errors).map(val=> val.message)
        error= new errorResponse(message,400)
    }

    res.status(error.statusCode||500).json({
        success:false,
        error:error.message || 'server error'
    })
}

module.exports= errorHandler