import { Router, Request, Response } from 'express'
import { getAllOrderController,
  getOrderByIdController,
  postOrderByIdController,
  updateOrderByIdController,
  deleteOrderByIdController
    }
  from "../controller/crudeController/orderController";

const orderRouter = Router(); 

orderRouter.get('/', getAllOrderController);
orderRouter.get('/:id', getOrderByIdController);
orderRouter.post('/', postOrderByIdController);
orderRouter.put('/:id', updateOrderByIdController );
orderRouter.delete('/:id', deleteOrderByIdController);

export  {orderRouter};