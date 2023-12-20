import mongoose from "mongoose";
import { DB_NAME } from "../constance.js";

const ConnectDB = async ()  => {
    try{
       const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
       console.log(`Connected !!! Host : ${connectionInstance.connection.host}`);
    }catch(error){
        console.error("Error",error);
        process.exit(1);
    }
}

export default ConnectDB;