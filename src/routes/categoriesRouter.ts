import Express from 'express'
import { getAllCategoriesController,
         getCategoryByIdController,
         postCategoryByIdController,
         updateCategoryByIdController,
         deleteCategoryByIdController
    }
  from "../controller/categoryController";

const Router2 = Express.Router(); 
Router2.get('/', getAllCategoriesController );
Router2.get('/:id', getCategoryByIdController);
Router2.post('/', postCategoryByIdController);
Router2.put('/:id', updateCategoryByIdController );
Router2.delete('/:id', deleteCategoryByIdController);

export  {Router2};

