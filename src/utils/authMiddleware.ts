import { NextFunction, Response, Request } from "express";
import { verifyToken } from "./jwt";
import { getToken, tokenService } from "../models/mongodb-models/auth/tokenServices";



declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        username: string;
        email: string;
      };
    }
  }
}

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    let authorizationHeader =req.headers.authorization || req.cookies["authorization"];

      console.log("header",authorizationHeader)

    if (!authorizationHeader) {
      res.status(401).json({
        message: "Token not found in header",
      });
      return;
    }

    if (typeof authorizationHeader != "string") {
      res.status(401).json({
        message: "token is not string",
      });
      return;
    }

    // const token = authorizationHeader?.split(" ")[1] || "";
    const token =authorizationHeader

    if (!token) {
      res.status(401).json({
        message: "token not found",
      });
      return;
    }

    const payload = verifyToken(token);

    const tokenInDb = await getToken({
      id: authorizationHeader,

    });
    console.log("tokendb",tokenInDb)
    if (!tokenInDb) {
      res.status(401).json({
        message: "Token not found. It seems you are logged out!!",
      });
      return;
    }

    req.user = payload;

    next();
  } catch (error) {
    console.error(error);
    if ((error as any).name === "TokenExpiredError") {
      next({
        status: 400,
        message: "Token expired",
      });
      return;
    }
    if ((error as any).name === "JsonWebTokenError") {
      next({
        status: 400,
        message: "Invalid token",
      });
      return;
    }

    next({ message: "Internal server error", status: 500 });
  }
}
