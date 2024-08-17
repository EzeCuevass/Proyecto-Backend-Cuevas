import { CartModel } from "./models/carts_model.js";

export default class CartManager {
    constructor(model){
        this.model = CartModel
    }
    async getAll(){
        try {
            return await this.model.find()
        } catch (error) {
            console.log(error);
        }
    }
    async createCart(){
        try {
            return await this.model.create({
                products: [],
            })
        } catch (error) {
            console.log(error);
        }
    }
    async getCartById(id){
        try {
            return await this.model.findById(id).populate("products.product")
        } catch (error) {
            console.log(error);
        }
    }
    async existsProdInCart(cid,pid){
        try {
            return await this.model.findOne({
                _id: cid,
                products: {$elemMatch:  {product:pid}}
            })
        } catch (error) {
            console.log(error);
        }
    }
    async addProdToCart(cid,pid,quantity){
        try {
            const existsProdInCart = await this.existsProdInCart(cid,pid);
            if (existsProdInCart) {
                const product = existsProdInCart.products.find((p)=>p.product.toString()==pid)
                return await this.model.findOneAndUpdate(
                    {_id: cid, 'products.product': pid},
                    {$set: {'products.$.quantity': product.quantity+1}},
                    {new:true}
                )
            } else { 
                return await this.model.findByIdAndUpdate(
                    cid,
                    {$push: {products: {product: pid}}},
                    {new:true}
                )
            }
        } catch (error) {
            console.log(error);
        }
    }
    async deleteProdInCart(cid,pid){
        try {
            const existsProdInCart = await this.existsProdInCart(cid,pid);
            if(!existsProdInCart){
                return "Product doesn't exist"
            } else {
                return await this.model.findByIdAndUpdate(
                cid,
                {$pull : { products : { product: pid}}},
                {new:true}
            )}
            }
            
            catch (error) {
            console.log(error);
        }
    }
    async updateQuantity(cid,pid,quantity){
        try {
            const existsProdInCart = await this.existsProdInCart(cid,pid)
            return await this.model.findOneAndUpdate(
                {_id:cid, 'products.product': pid},
                {$set: {'products.$.quantity': quantity} },
                {new:true}
            )
        } catch (error) {
            console.log(error);
        }
    }
    async emptyCart(cid){
        try {
            return await this.model.findByIdAndUpdate(
                cid,
                {$set: {products: []}  },
                {new:true}
            )
        } catch (error) {
            console.log(error);
        }
    }
}