
import userSession from "../../sessionUsermodel/sessions";
import loginUser from "../loginmodel/login";

export async function logoutUserByIdSession(user_id: string) {
  return await userSession.deleteMany({ user_id });
}

export async function LogoutUser(email: string) {
  return await loginUser.deleteOne({user_email: email });
}