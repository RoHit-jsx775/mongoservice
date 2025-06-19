// import { Request, Response } from "express";
// import { categoryModel } from "../sql-models/category.sql-models";

//  export const getAllCategoriesController=async  (req:Request, res:Response)=>{
//       const categories= await categoryModel.getAllCategories();
//       console.log(categories);
//       res.json(categories);
// }

// export const getCategoryByIdController=async (req:Request, res:Response)=>{
//     const id= parseInt(req.params.id);
//     const getOneCategory= await categoryModel.getOneCategory(id);
//     if(!getOneCategory){
//         res.status(404).json({error: "category not found"});
//     }
//     console.log(getOneCategory);
//     res.json(getOneCategory);

// }

// export const updateCategoryByIdController=async(req:Request, res:Response)=>{
//     const id= parseInt(req.params.id);
//     const updateCategory= await categoryModel.updateCategoryById(id, req.body);
//     if(!updateCategory){
//          res.status(500).json({error: "internal server error"})
//     }
//     console.log(updateCategory);
//     res.json(updateCategory);
    
// }

// export const deleteCategoryByIdController=async (req:Request, res:Response)=>{
//     const id= parseInt(req.params.id);
//     const deleteCategory= await categoryModel.deleteCategoryById(id);
//    // console.log(deleteCategory);
//    if(!deleteCategory){
//         res.status(404).json({error: "category not found"})
//     }
//     res.status(200).json(deleteCategory);
    
// }

// export const postCategoryByIdController=(req:Request, res:Response)=>{
//     const {name}= req.body;
//     if(!name){
//         res.status(400).json({error:"please provide appropriate input"});
//     }
//     const newCategory= categoryModel.postCategory({name});
//     console.log(newCategory);
//     res.status(200).json(newCategory);
    
// }




///-------------------------------------------------------------MONGODB----------------------------------------///



import { Request, Response, NextFunction } from "express";
import { createCategoryService, deleteCategoryByIdService, getAllCategoriesService, getCategoryByIdService, updateCategoryByIdService } from "../../models/mongodb-models/product_categories/categoryServices";
// import { CategoryModel } from "../models/category.model";

function validateCategoryInput(body: any) {
  if (typeof body.name !== "string" || !body.name.trim()) {
    return "Name is required";
  }
  return null;
}

export const getAllCategories = async (req: Request, res: Response) => {
  res.json(await getAllCategoriesService());
};

export const getCategoryById = async (req: Request, res: Response) => {
  const category = await getCategoryByIdService(req.params.id);
  if (!category) {
    res.status(404).json({ message: "Category not found" });
    return;
  }
  res.json(category);
};

export const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error = validateCategoryInput(req.body);
  const category = await createCategoryService(req.body);
  if (error) {
    res.status(400).json({ message: error });
    return;
  }
  try {
    res.status(201).json(category);
  } catch (err) {
    next(err);
  }
};

export const updateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = (req.params.id);
  const category = await updateCategoryByIdService({
    id,
    name: req.body.name,
  });
  if (!category) {
    res.status(404).json({ message: "Category not found" });
    return;
  }
  const error = validateCategoryInput({ ...category, ...req.body });
  if (error) {
    res.status(400).json({ message: error });
    return;
  }
  try {
    const updated = await getCategoryByIdService(id);
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

export const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const deleted = await deleteCategoryByIdService(req.params.id);
  if (!deleted) {
    res.status(404).json({ message: "Category not found" });
    return;
  }
  res.status(200).send({ message: "Category deleted successfully" });
};