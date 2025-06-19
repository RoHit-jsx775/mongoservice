// import { Request, Response } from "express";
// import orderService from "../models/mongodb-models/Orders/orderService";
// import {get}
// import {getUserByIdService} from "../models/mongodb-models/user/userServices";
// import {getProductByIdService} from  '../models/mongodb-models/Products/productServices';
// // import { orderModel } from "../sql-models/orders.sql.models";
// // import { userModel } from "../sql-models/user.sql-models";
// // import { SqlProductModel } from "../sql-models/product.sql-models";
// import { get } from "http";

// function validateOrderInput(body: any) {
//   if (typeof body.user_id !== "string") {
//     return "userId must be a number";
//   }
//   if (!Array.isArray(body.product_id) || body.product_id.length === 0) {
//     return "productIds must be a non-empty array";
//   }
//   // Check if user exists
//   if (!(getUserByIdService(body.user_id))) {
//     return "User does not exist";
//   }
//   // Check if all products exist
//   for (const pid of body.product_id) {
//     if (!getProductByIdService(pid)) {
//       return `Product with id ${pid} does not exist`;
//     }
//   }
//   return null;
// }

// export const getAllOrderController = async (req: Request, res: Response) => {
//     const allOrders = await orderService()
//     if(!allOrders) res.status(404).json({error: "No orders found"});
//     res.json(allOrders);
// };

// export const getOrderByIdController=async (req:Request, res:Response)=>{
//     const id= parseInt(req.params.id);
//     const getOneOrder= await orderModel.getOneOrderById(id);
//     console.log(getOneOrder);
//     if(!getOneOrder) res.status(404).json({error: "Order not found"});
//     res.json(getOneOrder);

// };

// export const postOrderByIdController=async(req:Request, res:Response)=>{
//    const error = validateOrderInput(req.body);
//   if (error) {
//     res.status(400).json({ message: error });
//     return;
//   }
//   try {
//     const order = await orderModel.createOrder(req.body);
//     res.status(201).json(order);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// };

// export const updateOrderByIdController=(req:Request, res:Response)=>{
//  {
//   const id = Number(req.params.id);
//   const order = orderModel.getOneOrderById(id);
//   if (!order) {
//     res.status(404).json({ message: "Order not found" });
//     return;
//   }
//   const error = validateOrderInput({ ...order, ...req.body });
//   if (error) {
//     res.status(400).json({ message: error });
//     return;
//   }
//   try {
//     const updated = orderModel.updateOrderById(id, req.body);
//     res.json(updated);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// }};

// export const deleteOrderByIdController = async (req: Request, res: Response) => {
//   const id = Number(req.params.id);
//   const deleted = await orderModel.deleteOrderById(id);
//   if (!deleted) {
//     res.status(404).json({ message: "Order not found" });
//     return;
//   }
//   res.status(200).json({ message: "Order deleted successfully" });
// };

import { Request, Response } from "express";
import {
  createOrderService,
  getAllOrdersService,
  getOrderByIdService,
 updateOrderByIdService,
  deleteOrderByIdService, 

} from "../../models/mongodb-models/order/orderService";

function validateOrderInput(body: any) {
  if (typeof body.user_id !== "string") {
    return "userId must be a string";
  }
  if (!Array.isArray(body.product_id) || body.product_id.length === 0) {
    return "productIds must be a non-empty array";
  }
  if (!body.user_id) {
    return "User ID is required";
  }
  for (const pid of body.product_id) {
    if (typeof pid !== "string") {
      return `Product ID ${pid} must be a string`;
    }

    // Additional validation logic can be added here
    return null;
  }
}
export const getAllOrderController = async (req: Request, res: Response) => {
  // const error = validateOrderInput(req.body);
  // if (error) {
  //    res.status(400).json({ error });
  //    return
  // }
  try {
    const allOrders = await getAllOrdersService();
    if (!allOrders) {
       res.status(404).json({ error: "No orders found" });
        return;
    }
    res.json(allOrders);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    return;
  }
};

export const postOrderByIdController = async (req: Request, res: Response) => {

  try {
    const order = await createOrderService(req.body);
    res.status(201).json(order);
    return;
  } catch (err) {
    res.status(500).json({ error: "Failed to create order" });
  }
};

export const getOrderByIdController = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const order = await getOrderByIdService(id);
    if (!order) {
    res.status(404).json({ error: "Order not found" });
      return;
    }
    res.json(order);
  }
  catch (error) {
    res.status(500).json({ error: "Failed to retrieve order" });
  }
}
 export const updateOrderByIdController = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const updatedOrder = await updateOrderByIdService(
      id,
      req.body,
    );
    if (!updatedOrder) {
    res.status(404).json({ error: "Order not found" });
      return;
    }
    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ error: "Failed to update order" });
  }
};

export const deleteOrderByIdController = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const deletedOrder = await deleteOrderByIdService(id);
    if (!deletedOrder) {
     res.status(404).json({ error: "Order not found" });
      return;
    }
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete order" });
    return;
  }
};