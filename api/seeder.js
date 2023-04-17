const fs = require('fs')
const mongoose=require('mongoose')
const dotenv=require('dotenv')

//load env variable
dotenv.config({path: './config/config.env'})

//load models
const Bootcamp=require('./models/Bootcamp.js')


//Connect to DB
mongoose.connect(process.env.MONGO_URL)

//Read JSON files
