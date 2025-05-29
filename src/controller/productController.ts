import express from "express";
import { Request, Response } from "express";
// import products, { createProduct } from '../models/product';
// import { getallProduct, getProductById, updateProductById, deleteProductById } from '../models/product';
// import { parse } from 'path';
// const router= express.Router();

import { get } from "http";

import { SqlProductModel } from "../sql-models/product.sql-models";
export const createProductController = async (req: Request, res: Response) => {
  const { product_name, price, category_id } = req.body;

  if (!product_name || !price || !category_id) {
    res.status(400).json({ error: "please provide appropriate input" });
  }

  const newProduct = await SqlProductModel.create({
    product_name,
    price,
    category_id,
  });
  console.log(newProduct);
  res.status(200).json(newProduct);
};

export const getallProductController = async (req: Request, res: Response) => {
  const allProducts = await SqlProductModel.getallProduct();
  res.json(allProducts);
};

export const getProductByIdController = async (req: Request, res: Response) => {
  const productId = parseInt(req.params.id);

  const getOneProduct = await SqlProductModel.getProductByIdName(productId);
  if (!getOneProduct) {
    res.status(404).json({ error: "No product found " });
  }

  res.status(200).json(getOneProduct);
};

export const updateProductController = async (req: Request, res: Response) => {
  const productId = parseInt(req.params.id);
  // const product = ProductModel.getById(productId);
  // const {name, price , description}=req.body;

  // if (!name || !price || !description){
  //   res.status(400).json({error:"please provide appropriate input"});
  // }

  const updatedProduct = await SqlProductModel.updateProductById(
    productId,
    req.body
  );

  if (!updatedProduct) {
    res.status(500).json({ error: "internal server error" });
  }

  res.json(updatedProduct);
};

export const deleteProductController = async (req: Request, res: Response) => {
  const productId = parseInt(req.params.id);

  const deleteProduct = await SqlProductModel.deleteProductById(productId);
  if (!deleteProduct) {
    res.status(404).json({ error: "product not found" });
  }
  res.status(200).json(deleteProduct);
};
