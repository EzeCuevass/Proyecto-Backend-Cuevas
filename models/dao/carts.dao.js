export default class CartManager {
    constructor(model){
        this.model = model
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
            // console.log("aser");
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
                return await this.model.findOneAndUpdate(
                    {_id: cid, 'products.product': pid},
                    {$set: {'products.$.quantity': existsProdInCart.products[0].quantity + 1}},
                    {new:true}
                )
            } else {
                console.log("insta");
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
}