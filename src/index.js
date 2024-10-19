import dotenv from 'dotenv'


import mongoose from "mongoose";
import { DB_NAME } from "./constants.js";   //importing data base name
import connectDB from "./db/index.js";
dotenv.config({
    path: './env'
});
connectDB()













/*
import express from "express"
const app = express()

// using async and await because talking to db takes time 
( async ()=>{
    try {
        // using try to connect db and catch so that any error occur
      await  mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("errror",(error)=>{
            console.log("ERRR: ",error);
            throw error
        })    
        app.listen(process.env.PORT, ()=>{
            console.log(`App is listening to port ${process.env.PORT}`)
            
        })
    } catch (error) {
        console.error("Error", error);
        throw err
    }
})
*/