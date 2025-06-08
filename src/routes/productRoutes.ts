// import express, { NextFunction, Request, Response } from "express";
// import { createProductController } from "../controller/productController";
// import { getallProductController } from "../controller/productController";
// import { updateProductController } from "../controller/productController";
// import { deleteProductController } from "../controller/productController";
// import { getProductByIdController } from "../controller/productController";
// import { firstMiddleware } from "../middleware/Middleware";
// const router = express.Router();

// router.post("/create", createProductController);
// router.get("/", getallProductController);
// router.put("/:id", firstMiddleware, updateProductController);
// router.delete("/:id", firstMiddleware, deleteProductController);
// router.get("/:id", firstMiddleware, getProductByIdController);

// export default router;















import  express  from "express";
import { createProduct, getProduct, getProductById ,updateProductById,deleteProductById} from "../controller/productController";

const productRouter= express.Router();

productRouter.post('/', createProduct);
productRouter.get('/', getProduct);
productRouter.get('/:id', getProductById);
productRouter.put('/:id', updateProductById);
productRouter.delete('/:id', deleteProductById);


export {productRouter} 