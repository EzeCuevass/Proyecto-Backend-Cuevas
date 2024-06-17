import { Schema, model } from "mongoose";

const prodSchema = new Schema({
    title: { type: String, required: true },
    description: { type:String, required:true }, 
    price: { type:Number, required:true },
    thumbnail: { type:String, required:true },
    code: { type:Number, required:true },
    stock: {type: Number, required: true},
    categories: {type: String, required: true}
})

export const ProductModel = model("products", prodSchema)