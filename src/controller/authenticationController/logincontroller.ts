import {
  checkIfUserExist,
  createloginService,
  getAllUserlogin,
} from "../../models/authentication/loginmodel/login_service";
import { Request, Response } from "express";
import {
  createSession,
  getusersByEmailService,
} from "../../models/sessionUsermodel/sessionUsermodelServices";

import { generateToken, TPayload } from "../../utils/jwt";
import { userMongoService } from "../../models/mongodb-models/auth/service";
import { TokenModel } from "../../models/mongodb-models/auth/model";

export const login = async (req: Request, res: Response) => {
  const { user_email, user_password } = req.body;

  try {
    const userexist = await checkIfUserExist(user_email, user_password);
    const newlogin = await getAllUserlogin(user_email, user_password);
    console.log("userexist", userexist);
    console.log("new loginn", newlogin);

    if (!newlogin || newlogin.length === 0) {
      res.status(401).json({ message: "Invalid user" });
    }

    if (!userexist || userexist.length === 0) {
      res.status(400).json({ message: "User not found" });
      return;
    }

    const user = await userMongoService.getUserByEmail({
      user_email: user_email,
    });
    console.log("user..", user);

    if (!user) {
      res.status(400).json({ message: "User not found" });
      return;
    }

    const userPayload: TPayload = {
      id: user._id.toString(),
      username: user.user_name,
      email: user.user_email,
    };

    const sessionId = generateToken(userPayload);
    console.log("sessiontoken", sessionId);

    const userId = await getusersByEmailService(user_email);
    console.log("userid", userId);

    if (!userId) {
      res
        .status(400)
        .json({ message: "User ID not found for session creation" });
      return;
    }

    const UserSession = await createSession({
      user_id: userId.toString(),
      id: sessionId,
    });
    console.log("usersession", UserSession);
  const expires_on=30
    // Set cookie before sending response
    res.cookie("authorization", sessionId, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now()+expires_on * 30000), // 30 seconds
      sameSite: "lax",
      secure: process.env["ENVIRONMENT"] === "prod",
    });

    const save = await createloginService({ user_email, user_password });
    console.log("save...", save);


  


    res.status(200).json({
      message: "Login successful, session created",
      session: UserSession,
      loginLog: save,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error", error: err });
    return;
  }
};

// import { Request, Response } from "express";
// import {
//   checkIfUserExists,
//   getLoginByEmail,
//   storeLoginDetailsService,
// } from "./loginservice";

// export const createLogin = async (req: Request, res: Response) => {
//   try {
//     const { email, password } = req.body;

//     const userExists = await checkIfUserExists(email, password);

//     if (userExists && userExists.length > 0) {
//       // is user logged in
//       const loginExists = await getLoginByEmail (email );
//       console.log("result",loginExists)
//       if (!loginExists) {
//         // else directly return logged in message
//         res.status(200).json({
//           message: "already logged in",
//           data: loginExists,
//         });
//         return;
//       }

//       // if user is not logged in,
//       const savedLoginData = await storeLoginDetailsService(email, password);
//       res.status(200).json({
//         message: "You are now logged in",
//         data: savedLoginData,
//       });
//     } else {
//       res.status(401).json("Invalid credentials");
//     }
//   } catch (error) {
//     console.log("Login failed:", error);
//     res.json("Unable to login");
//   }
