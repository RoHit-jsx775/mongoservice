import User from "../mongodb-models/user/user.mongodb-model";
import bcrypt from "bcrypt";

export async function registerUserService(data: {
  user_name: string;
  user_email: string;
  user_password: string;
}) {
  const existing = await User.findOne({ user_email: data.user_email });
  if (existing) throw new Error("Email already in use");

  const hashedPassword = await bcrypt.hash(data.user_password, 10);
  const user = new User({ ...data, user_password: hashedPassword });
  return await user.save();
}

