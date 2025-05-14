import { Request, Response, NextFunction } from "express";
 export const firstMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const role = req.query.role;
    if (role === "admin") {
      next();
    }
    else if(role==="user"){
      next();
    }
    else
      next({
        message: "you are not admin",
        status: 403,
      });
  }

  //  export const secondMiddleware = (req: Request, res: Response, next: NextFunction) => {
  //   const role = req.query.role;
  //   if (role === "user") {
  //     next();
  //   } else
  //     next({
  //       message: "you are not user",
  //       status: 403,
  //     });
  // }