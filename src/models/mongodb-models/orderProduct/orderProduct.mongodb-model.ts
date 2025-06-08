import mongoose, {Schema} from "mongoose";

const orderProductSchema = new Schema({
    order_id: {
        type: Schema.Types.ObjectId,
        ref: "Order",
        required: true
    },
    product_id: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true
    }
});

const OrderProduct = mongoose.model("OrderProduct", orderProductSchema);
export default OrderProduct;
