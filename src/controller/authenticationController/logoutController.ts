import { Request, Response } from "express";
import {  LogoutUser, logoutUserByIdSession } from "../../models/authentication/logout/logoutservices";
import { getusersByEmailService } from "../../models/sessionUsermodel/sessionUsermodelServices";

export const logout = async (req: Request, res: Response) => {
  const { user_email } = req.body;

  try {
    if (!user_email) {
      res.status(400).json({ message: "User email is required" });
       return
    }

    const userid = await getusersByEmailService(user_email);
    console.log("userid  ",userid)

    if (!userid || !userid._id) {
       res.status(404).json({ message: "User not found" });
       return
    }

  res.clearCookie("authorization")
      const logoutuser = await LogoutUser(user_email);

      if (!logoutuser) {
        res.status(500).json({ message: "already logout..." });
        return;
      }




    const result = await logoutUserByIdSession(userid._id.toString());
    console.log("result",result)

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
