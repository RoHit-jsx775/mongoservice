import { Request, Response } from "express";
import { logoutUserByIdService } from "../../models/authentication/logoutservices";
import { getusersByEmailService } from "../../models/sessionUsermodel/sessionUsermodelServices";

export const logout = async (req: Request, res: Response) => {
  const { user_email } = req.body;

  try {
    if (!user_email) {
      return res.status(400).json({ message: "User email is required" });
    }

    const user = await getusersByEmailService(user_email);

    if (!user?._id) {
      return res.status(404).json({ message: "User not found" });
    }

    const result = await logoutUserByIdService(user_email);

    if (!result || result.deletedCount === 0) {
      return res.status(400).json({ message: "No active session found for this user" });
    }

    return res.status(200).json({
      message: "Logout successful",
    });
  } catch (err) {
    console.error("Logout error:", err);
    return res.status(500).json({ message: "Server error", error: err });
  }
};
