import User from "../mongodb-models/user/user.mongodb-model"
import loginUser from "./login";


export async function getAllUserlogin(user_email:string, user_password:string) {
    const allUsers= await User.find( {user_email,user_password});
    return allUsers
    
}
export async function createloginService(data:{ user_email:string, user_password:string }){
    const createdUser= new loginUser(data);
    return await createdUser.save();
}