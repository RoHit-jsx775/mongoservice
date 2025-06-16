import { Schema } from "mongoose";
import mongoose from "../mongodb-models/mongodb-client";


const sessionSchema= new Schema({
     user_id:
     {
        type: String,
        required: true,
        ref:"Users"
     },
     id:{
        type: String,
        required:true

     }
})

const userSession= mongoose.model('userSession', sessionSchema);

export default userSession;