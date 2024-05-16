import fs from 'fs'
import { ProductManager } from './clases.js'
import { v4 as uuidv4 } from "uuid"
const productManager = new ProductManager()
export class cartManager {
    constructor(){
        this.path = './db/carts.json'
    }
    async getCarts(){
        if(fs.existsSync(this.path)){
            // console.log("asd");
            const cartsFile = await fs.promises.readFile(this.path, 'utf-8')
            return JSON.parse(cartsFile)
        } else {
            console.log(fs.existsSync(this.path));
            return []
        }
    }
    async createCart(){
        const newCart = {
            id : uuidv4(),
            products: []
        }
        const carts = await this.getCarts()
        carts.push(newCart)
        await fs.promises.writeFile(this.path, JSON.stringify(carts))
        console.log("cart added");
        return "Cart added"
    }

    async addtoCart(idProduct, idCart){
        try {
            const carts = await this.getCarts()
            const product = await productManager.getProductById(idProduct);
            const cart = await this.getCartById(idCart);
            // console.log(product);
            // console.log(cart);
            // console.log(cart.products.quantity);
            // console.log(cart);
            const exists = cart.products
            // console.log(exists);
            if (exists==[]){
                const newCart = {
                    id: idCart,
                    products: {
                        id: idProduct,
                        quantity:1
                    }
                }
                const newCarts = carts.filter((cart) => cart.id != idCart)
                newCarts.push(newCart)
                await fs.promises.writeFile(this.path, JSON.stringify(newCarts))
                return newCarts
            } else {
                // console.log(exists);
                const newCart = {
                    id: idCart,
                    products: {
                        id: idProduct,
                        quantity:1
                    }
                }
                const newCarts = carts.filter((cart) => cart.id != idCart)
                newCarts.push(newCart)
                await fs.promises.writeFile(this.path, JSON.stringify(newCarts))
                return newCarts
            }

        } catch (error) {
            console.log(error);
            return error
        }
    }
    async getCartById(idCart){
        const carts = await this.getCarts();
        const cart = carts.find((cart)=>cart.id == idCart)
        if (!cart){
            return "Not Found"
        } else {
            return cart
        }
    }
}
// const cartsManager = new cartManager()
// const pruebas = async()=>{
//     // cartsManager.createCart()
    // console.log(await cartsManager.getCarts());
//     // console.log( await cartsManager.getCartById("f1cbe608-91e2-4aa3-8b55-bc3e5fa5bb46"));
//     await cartsManager.addtoCart(1, "f1cbe608-91e2-4aa3-8b55-bc3e5fa5bb46")
// }
// pruebas()