import { Schema, Model } from "mongoose";

const ticketSchema = new Schema({
    code: {typeof:String, required: true},
    purchase_datetime:{typeof:Date, required: true},
    amount: {typeof: Number, required:true},
    purchaser: {typeof:String, required: true, ref:'users'}
})

export const ticketModel = model("tickets", ticketSchema)