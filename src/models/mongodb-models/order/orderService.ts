import Order from "./orders.mongodb-model"

export const createOrderService= (data:{user_id:string,product_id:string,total_amount:number})=>{
    const order = new Order(data);
    return order.save();
}

export const getAllOrdersService = async () => {
    return await Order.find();
    
}

export const getOrderByIdService = async (id: string) => {
    return await Order.findById(id);
}
 export const updateOrderByIdService=async (id: string, order:Partial<{user_id:string,product_id:string,total_amount:number}>) => {
    return await Order.findByIdAndUpdate(id, order, { new: true });
 }
export const deleteOrderByIdService = async (id: string) => {
    return await Order.deleteOne({ _id: id });
}