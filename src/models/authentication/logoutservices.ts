import loginUser from "./login";

export const logoutUserByIdService = async (user_email: string) => {
  return await loginUser.deleteOne({ user_email: user_email });
};
