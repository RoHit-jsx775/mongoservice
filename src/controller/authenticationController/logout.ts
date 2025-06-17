import { Request, Response } from "express";
import { logoutUserByIdService } from "../../models/authentication/logoutservices";
import { getusersByEmailService } from "../../models/sessionUsermodel/sessionUsermodelServices";

export const logout = async (req: Request, res: Response) => {
  const { user_email } = req.body;

  try {
    if (!user_email) {
      res.status(400).json({ message: "User email is required" });
       return
    }

    const user = await getusersByEmailService(user_email);

    if (!user || !user._id) {
       res.status(404).json({ message: "User not found" });
       return
    }

 
    const result = await logoutUserByIdService(user._id.toString());

    if (!result || result.deletedCount === 0) {
      res.status(400).json({ message: "No active session found for this user" });
       return
    }

  res.status(200).json({ message: "Logout successful" });
     return

  } catch (err) {
    console.error("Logout error:", err);
    res.status(500).json({ message: "Server error", error: err });
     return
  }
};
