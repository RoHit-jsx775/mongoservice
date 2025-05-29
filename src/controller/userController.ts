import express from "express";
import { Request, Response } from "express";
// import products, { createProduct } from '../models/product';
// import { getallProduct, getProductById, updateProductById, deleteProductById } from '../models/product';
// import { parse } from 'path';
// const router= express.Router();

import { get } from "http";

import { userModel } from "../sql-models/user.sql-models";
export const createUsersController = async (req: Request, res: Response) => {
  const { user_name, name, email } = req.body;

  if (!user_name || !name || !email) {
    res.status(400).json({ error: "please provide appropriate input" });
  }

  const newUsers = await userModel.postUsers({
    user_name,
    name,
    email,
  });
  console.log(newUsers);
  res.status(200).json(newUsers);
};

export const getallUsersController = async (req: Request, res: Response) => {
  const allUsers = await userModel.getAllUsers();
  res.json(allUsers);
};

export const getUsersByIdController = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);

  const getOneUsers = await userModel.getOneUser(userId);
  if (!get) {
    res.status(404).json({ error: "No users found " });
  }

  res.status(200).json(getOneUsers);
};

export const updateUsersController = async (req: Request, res: Response) => {
  const usersId = parseInt(req.params.id);
  // const product = ProductModel.getById(productId);
  // const {name, price , description}=req.body;

  // if (!name || !price || !description){
  //   res.status(400).json({error:"please provide appropriate input"});
  // }

  const updatedUsers = await userModel.updateUserById(
    usersId,
    req.body
  );

  if (!updatedUsers) {
    res.status(500).json({ error: "internal server error" });
  }

  res.json(updatedUsers);
};

export const deleteUsersController = async (req: Request, res: Response) => {
  const usersId = parseInt(req.params.id);

  const deleteUsers = await userModel.deleteUserById(usersId);
  if (!deleteUsers) {
    res.status(404).json({ error: "users not found" });
  }
  res.status(200).json(deleteUsers);
};
