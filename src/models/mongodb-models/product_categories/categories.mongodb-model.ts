import{Schema} from "mongoose";
import mongoose from '../mongodb-client'


const categorySchema = new Schema({
        name: {
        type: String,
        required: true
    }
});
const Category = mongoose.model("Category", categorySchema);

export default Category;