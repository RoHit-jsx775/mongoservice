import express, { NextFunction, Request, Response } from "express";
import { createProductController } from "../controller/productController";
import { getallProductController } from "../controller/productController";
import { updateProductController } from "../controller/productController";
import { deleteProductController } from "../controller/productController";
import { getProductByIdController } from "../controller/productController";
import { firstMiddleware,  } from "../middleware/Middleware";
const router = express.Router();

router.post("/", firstMiddleware,createProductController);
router.get("/",getallProductController);
router.put("/:id",firstMiddleware, updateProductController);
router.delete("/:id",firstMiddleware, deleteProductController);
router.get("/:id",firstMiddleware, getProductByIdController);

export default router;
