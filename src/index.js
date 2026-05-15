// require('dotenv').config({path:'./env'})
import dotenv from "dotenv"

import express from "express"
import connectDB from "./db/db.js";
const app=express()

dotenv.config({
    path:"./.env"
})

connectDB();



/*
(async()=>{
    try{
       await mongoose.connect(`${process.env.MONGOOSE_URL}/${DB_NAME}`)
       app.on("error",(error)=>{
        console.log("ERR",error)
        throw error
       })
       app.listen(process.env.PORT,()=>{
        console.log(`App is listening on port ${process.env.PORT}`)

       })
    }
    catch(error){
        console.log("ERROR: ",error)
        throw err;
    }
})()
*/