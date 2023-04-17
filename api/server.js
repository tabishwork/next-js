const path = require('path')
const dotenv=require("dotenv")
dotenv.config({path: './config/config.env'})

const express= require("express")
const connectDB= require('./config/db.js')

//Routes files
const bootcamps = require('./routes/bootcamps.js')
const courses=require('./routes/courses.js')
const auth=require('./routes/auth.js')
const reviews=require('./routes/reviews')
const users=require('./routes/users')


const morgan= require("morgan")
const fileupload = require('express-fileupload')
const cookieParser=require('cookie-parser')
const errorHandler=require("./middlewares/error.js")


//db connected
connectDB()

const app = express()

//body Parser
app.use(express.json())


//Cookie parser
app.use(cookieParser())



//dev logging Middleware morgan
if(process.env.NODE_ENV==="development"){
    app.use(morgan('dev'))
}

//File uploading 
app.use(fileupload())


//set static folders
app.use(express.static(path.join(__dirname, 'public')))


//use routers
app.use('/api/v1/bootcamps',bootcamps)
app.use('/api/v1/courses',courses)
app.use('/api/v1/auth',auth)
app.use('/api/v1/reviews',reviews)
app.use('/api/v1/auth/users',users)



//errorHandler
app.use(errorHandler)

const PORT= process.env.PORT

app.listen(PORT,console.log(`serving running in ${process.env.NODE_ENV}mode on 
port${PORT}`))