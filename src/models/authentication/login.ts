import { Schema } from "mongoose";
import mongoose from "../mongodb-models/mongodb-client";



const userSchema = new Schema({
  
    user_email: {
        type: String,
        required: true,
        unique: true
    },
    user_password: {
        type: String,
        required: true
   
}}
);

const loginUser= mongoose.model('loginUser', userSchema);

export default loginUser;

