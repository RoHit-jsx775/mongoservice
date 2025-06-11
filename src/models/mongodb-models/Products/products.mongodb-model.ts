import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
    {
      product_name :{
        type: String,
        required: true, 
      },
      description:{
        type: String,
        required: true,
      },
      price:{
        type: Number,
        required: true,
      },
      created_at:{
        type: Date,
        default: Date.now,
      } ,
      updated_at:{
        type: Date,
        reaquired: false,
        default: Date.now,
      
      } ,
      category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true
      }
    }
)

const Product = mongoose.model("Product", productSchema);

export default Product;

//mongoose.model.product|| Product;