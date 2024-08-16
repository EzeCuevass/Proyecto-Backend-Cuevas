export class CartRepository{
    constructor(dao){
        this.dao = dao
    }
    async getAll(){
        return await this.dao.getAll()
    }
    async createCart(){
        return await this.dao.createCart()
    }
    async getCartById(id){
        return await this.dao.getCartById(id)
    }
    async existsProdInCart(cid,pid){
        return await this.dao.existsProdInCart(cid,pid)
    }
    async addProdToCart(cid,pid,quantity){
        return await this.dao.addProdToCart(cid,pid,quantity)
    }
    async deleteProdInCart(cid,pid){
        return await this.dao.deleteProdInCart(cid,pid)
    }
    async updateQuantity(cid,pid,quantity){
        return await this.dao.updateQuantity(cid,pid,quantity)
    }
    async emptyCart(cid){
        return await this.dao.emptyCart(cid)
    }
}