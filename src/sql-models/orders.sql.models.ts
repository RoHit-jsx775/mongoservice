import { Request, Response } from "express";
import pool from "./mysql-client";
import { SqlProductModel } from "./product.sql-models";

type orderTypes={
         order_id: Number,
         user_id: Number,
         status: String,
         orderDate: Date,
         totalAmount: Number,
       
}

export const orderModel={

   async getAllOrders(){
    const [allOrders]= await pool.query("SELECT * FROM orders");
    return allOrders;
   },

   async getOneOrderById(id:Number){
    const [singleOrder]= await pool.query("SELECT * FROM orders WHERE order_id = ?", [id]);
    if(!singleOrder) return "Order not found";
    console.log(singleOrder)
      if (!Array.isArray(singleOrder) || !singleOrder.length) return undefined;

      return singleOrder[0];
   },

   async createOrder(order: { user_id: number; product_id: number[] }){
       const conn = await pool.getConnection();
        try {
      await conn.beginTransaction();

      let totalAmount = 0;

      for (const product_id of order.product_id) {
        const product = await SqlProductModel.getProductByIdName(product_id);
        console.log(product);

        if (!product) {
          throw new Error("product not found");
        }

        const amount = Number(product.price);  // using constructor to convert string to number
        console.log(amount);
        totalAmount += Number(amount);   
        console.log(totalAmount);
      }

      const [result]: any = await conn.query(
        "INSERT INTO orders (user_id, total_amount) VALUES (?, ?)",
        [order.user_id, totalAmount]
      );
      const orderId = result.insertId;
      for (const pid of order.product_id) {
        await conn.query(
          "INSERT INTO order_items (order_id, product_id) VALUES (?, ?)",
          [orderId, pid]
        );
      }
      await conn.commit();
      return {
        id: orderId,
        user_Id: order.user_id,
        product_id: order.product_id,
      };
    } catch (err) {
      await conn.rollback();
      throw err;
    } finally {
      conn.release();
    }

   },

   async updateOrderById(id:Number, order:Partial<{user_id:Number, product_id:Number[], status:string}>){
        {
    const conn = await pool.getConnection();
    try {
      await conn.beginTransaction();
      if (order.user_id !== undefined) {
        await conn.query("UPDATE orders SET user_id = ? WHERE id = ?", [
          order.user_id,
          id,
        ]);
      }
      if (order.product_id !== undefined) {
        await conn.query("DELETE FROM order_items WHERE order_id = ?", [id]);
        for (const pid of order.product_id) {
          await conn.query(
            "INSERT INTO order_items (order_id, product_id) VALUES (?, ?)",
            [id, pid]
          );
        }
      }
      await conn.commit();
      return this.getOneOrderById(id);
    } catch (err) {
      await conn.rollback();
      throw err;
    } finally {
      conn.release();
    }
  }


   },

   async deleteOrderById(id:Number){
       const findOrder = await this.getOneOrderById(id);
      
       const [result]: any = await pool.query(
         "DELETE FROM orders WHERE order_id = ?",
         [id]
       );
       return result.affectedRows > 0;
   }
    
}