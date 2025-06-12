import { createloginService, getAllUserlogin } from "../../models/authentication/login_service";
import { Request,Response } from "express";

export const login= async(req:Request,res:Response)=>{
    const {user_email,user_password}=req.body
    const newlogin=await getAllUserlogin(user_email,user_password)
    if(newlogin&&newlogin.length>0){
        res.json("login sucessfully....")

       const save= await createloginService({user_email,user_password})
    }
    else{
        res.json("invalid user")
    }
return
}
