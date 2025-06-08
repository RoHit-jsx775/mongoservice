import mongoose,{Schema} from "mongoose";

const orderSchema = new Schema({
     user_id: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
      }, 
      product_id: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true
      },
      total_amount:{
        type: Number,
        required: true
      }

});

const Order = mongoose.model("Order", orderSchema);
export default Order;