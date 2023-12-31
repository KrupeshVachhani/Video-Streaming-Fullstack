// require('dotenv').config();
// import mongoose from 'mongoose';
// import { DB_NAME } from './constance';
import dotenv from "dotenv";
import express from "express";
import ConnectDB from "./db/index.js";
import { app } from "./app.js";

// const app = express();

dotenv.config({
    path: "./.env",
});
ConnectDB()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log(`Listening on port ${process.env.PORT}`);
        });
    })
    .catch((error) => {
        console.error("Error", error);
        throw error;
    });

// //effie ()() immdeately invoked function expression
//
// ;(async ()=>{
//     try{
//        await mongoose.connect(`${process.env.MONGODB_URI} / ${DB_NAME}`);
//        app.on("error",()=>{
//               console.error("Error",error);
//                 throw error
//             })
//        app.listen(process.env.PORT,()=>{
//               console.log(`Listening on port ${process.env.PORT}`);
//          })

//         }catch(error){
//         console.error("Error",error);
//         throw error
//     }}
// )()
