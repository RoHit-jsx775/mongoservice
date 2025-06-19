
// import express, { NextFunction, Request, Response } from "express";
// import { createUsersController } from "../controller/userController";
// import { getallUsersController } from "../controller/userController";
// import { updateUsersController } from "../controller/userController";
// import { deleteUsersController } from "../controller/userController";
// import { getUsersByIdController } from "../controller/userController";

// const router3 = express.Router();

// router3.post("/", createUsersController);
// router3.get("/", getallUsersController);
// router3.put("/:id", updateUsersController);
// router3.delete("/:id", deleteUsersController);
// router3.get("/:id", getUsersByIdController);

// export default router3;




import express from 'express'
import {
    getAllUser, getUserById, createUser, updateUser, deleteUserById
} from '../controller/crudeController/userController'

const userRouter= express.Router();
userRouter.get("/", getAllUser);
userRouter.get('/:id', getUserById);
userRouter.post('/', createUser);
userRouter.delete('/:id', deleteUserById);
userRouter.put('/:id', updateUser);

export {userRouter};