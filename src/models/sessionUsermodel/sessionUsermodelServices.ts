
import User from "../mongodb-models/user/user.mongodb-model";
import userSession from "./sessions";

export const createSession = (data: { user_id: string, id: string }) => {
   
    const session = new userSession(data);
    return session.save();
};


export async function getusersByEmailService(user_email: string) {
  const users = await User.findOne({ user_email }).select("_id").lean();
  console.log("Found user for email:", user_email, "==>", User); // debug log
  return users?._id;
}

