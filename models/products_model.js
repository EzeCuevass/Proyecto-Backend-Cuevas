import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"
const prodSchema = new Schema({
    title: { type: String, required: true },
    description: { type:String, required:true }, 
    price: { type:Number, required:true },
    thumbnail: { type:String, required:true },
    code: { type:Number, required:true },
    stock: {type: Number, required: true},
    categories: {type: String, required: true}
})

prodSchema.plugin(mongoosePaginate);

export const ProductModel = model("products", prodSchema)