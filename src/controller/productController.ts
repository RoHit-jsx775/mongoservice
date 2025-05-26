import express from "express";
import { Request, Response } from "express";
// import products, { createProduct } from '../models/product';
// import { getallProduct, getProductById, updateProductById, deleteProductById } from '../models/product';
// import { parse } from 'path';
// const router= express.Router();

import { get } from "http";

import { SqlProductModel } from "../sql-models/product.sql-models";
// export function createProductController (req:Request, res:Response){
//     const {name, price, description}= req.body;

//   if (!name || !price || !description){
//     res.status(400).json({error:"please provide appropriate input"});
//   }

//   const newProduct=  createProduct({
//         description:description,
//         name: name,
//         price:price,
//     })
//     res.status(200).json(newProduct)}
export const getallProductController = async (req: Request, res: Response) => {
  const allProducts = await SqlProductModel.getallProduct();
  res.json(allProducts);
};

export const getProductByIdController= async (req: Request, res: Response) =>{
  const productId= parseInt(req.params.id);

  const getOneProduct= await SqlProductModel.getProductByIdName(productId)
    if (!getOneProduct) {
      res.status(404).json({ error: "No product found " });
    }

    res.status(200).json(getOneProduct);
  }

// export function updateProductController(req:Request, res:Response){
//   const productId= parseInt(req.params.id);

//     const {name, price , description}=req.body;

//     if (!name || !price || !description){
//       res.status(400).json({error:"please provide appropriate input"});
//     }

//     const updatedProduct= updateProductById(
//       {
//         id:productId,
//         name:name,
//         price:price,
//         description:description,
//       }
//     )

//     if(!updatedProduct){
//         res.status(500).json({error: "internal server error"})
//     }

//      res.json(updatedProduct);

// }

// export function deleteProductController(req:Request, res:Response){
//     const productId= parseInt(req.params.id);

//     const deleteProduct= deleteProductById(productId);
//     if(!deleteProduct?.length){
//         res.status(404).json({error: "product not found"})
//     }
//     res.status(200).json(deleteProduct);

// }
