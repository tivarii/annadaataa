import mongoose from "mongoose";

export const connectDB = async () =>{
    try{
        await mongoose.connect(process.env.MONGODB_URL || "");
        console.log("connected to mongodb");

    }catch(e){
        console.log("enable to connect to mongodb",e);
    }
};
