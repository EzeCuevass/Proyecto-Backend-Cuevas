import ProductManager from "../models/dao/products.dao.js";
import CartManager from "../models/dao/carts.dao.js";
import { CartModel } from "../models/carts_model.js";
import { ProductModel } from "../models/products_model.js";
const cartManager = new CartManager(CartModel)
const prodManager = new ProductManager(ProductModel)
export const addProdToCart = async (cid, pid) => {
    try {
        const existCart = await cartManager.getCartById(cid)
        if(!existCart) return null
        const existProd = await prodManager.getById(pid)
        if(!existProd) return null

        return await cartManager.addProdToCart(cid,pid)
    } catch (error) {
        console.log(error);
    }
}