import { Request, Response } from "express";
import { registerUserService } from "../../models/authentication/loginmodel/registerAthentication";

export async function registerController(req: Request, res: Response) {
  try {
    const user = await registerUserService(req.body);
    res.status(201).json({ message: "User registered", user });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}
