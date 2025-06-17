
import userSession from "../sessionUsermodel/sessions";

export async function logoutUserByIdService(user_id: string) {
  return await userSession.deleteMany({ user_id });
}
