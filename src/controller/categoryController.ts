import { Request, Response } from "express";
import { categoryModel } from "../sql-models/category.sql-models";

 export const getAllCategoriesController=async  (req:Request, res:Response)=>{
      const categories= await categoryModel.getAllCategories();
      console.log(categories);
      res.json(categories);
}

export const getCategoryByIdController=async (req:Request, res:Response)=>{
    const id= parseInt(req.params.id);
    const getOneCategory= await categoryModel.getOneCategory(id);
    if(!getOneCategory){
        res.status(404).json({error: "category not found"});
    }
    console.log(getOneCategory);
    res.json(getOneCategory);

}

export const updateCategoryByIdController=async(req:Request, res:Response)=>{
    const id= parseInt(req.params.id);
    const updateCategory= await categoryModel.updateCategoryById(id, req.body);
    if(!updateCategory){
         res.status(500).json({error: "internal server error"})
    }
    console.log(updateCategory);
    res.json(updateCategory);
    
}

export const deleteCategoryByIdController=async (req:Request, res:Response)=>{
    const id= parseInt(req.params.id);
    const deleteCategory= await categoryModel.deleteCategoryById(id);
   // console.log(deleteCategory);
   if(!deleteCategory){
        res.status(404).json({error: "category not found"})
    }
    res.status(200).json(deleteCategory);
    
}

export const postCategoryByIdController=(req:Request, res:Response)=>{
    const {name}= req.body;
    if(!name){
        res.status(400).json({error:"please provide appropriate input"});
    }
    const newCategory= categoryModel.postCategory({name});
    console.log(newCategory);
    res.status(200).json(newCategory);
    
}