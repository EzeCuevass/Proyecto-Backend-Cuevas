// Importaciones
import fs from 'fs'
import { ProductManager } from './product-manager.js'
import { v4 as uuidv4 } from "uuid"
// Utilizacion de la clase productManager
const productManager = new ProductManager()
// Creacion y exportacion de la clase cartManager
export class cartManager {
    constructor(){
        // Ruta en la que se lleva a cabo el CRUD
        this.path = './db/carts.json'
    }
    /*
    Metodo asincrono, que lee a ruta, si existe el archivo retorna los datos de el, si no un array vacio
    */
    async getCarts(){
        if(fs.existsSync(this.path)){
            const cartsFile = await fs.promises.readFile(this.path, 'utf-8')
            return JSON.parse(cartsFile)
        } else {
            console.log(fs.existsSync(this.path));
            return []
        }
    }
    /*
    Metodo asincrono para crear carrito, utiliza el metodo getCarts para traer los carritos, crea el nuevo carrito
    con id creado por uuid, y un array de productos por el momento, vacio, pushea el carro al array de 
    los carts y lo escribe con fs.
    */
    async createCart(){
        const carts = await this.getCarts()
        const newCart = {
            id : uuidv4(),
            products: []
        }
        carts.push(newCart)
        await fs.promises.writeFile(this.path, JSON.stringify(carts))
        return "Cart added"
    }
    /*
    Metodo asincrono que agrega un producto al carrito, utiliza com parametro el id del producto 
    y el id del carrito en el que se va a poner el producto.
    Se traen los carritos, el producto indicado, y el carrito en el que se introduce el producto
    Si no existe la cantidad en los productos, significa que nunca antes habia sido agregado, por lo que 
    se introduce al carrito, el producto solo con el id y la cantidad, si es que la cantidad ya existia, le
    suma un nuevo ejemplar de este producto
    Retorna el mensaje de "Product has been added"
    */
    async addtoCart(idProduct, idCart){
        try {
            const carts = await this.getCarts()
            const product = await productManager.getProductById(idProduct);
            const cart = await this.getCartById(idCart);
            const exists = cart.products.quantity
            if (!exists){
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
                return "Product has been added"
            } else {
                const newCart = {
                    id: idCart,
                    products: {
                        id: idProduct,
                        quantity:exists+1
                    }
                }
                const newCarts = carts.filter((cart) => cart.id != idCart)
                newCarts.push(newCart)
                await fs.promises.writeFile(this.path, JSON.stringify(newCarts))
                return "Product has been added"
            }

        } catch (error) {
            console.log(error);
            return error
        }
    }
    /*
    Metodo asincrono que recibe como parametro el id, y busca en el json de carritos, si hay uno que 
    coincida con el del paramtro, si lo encuentra lo retorna, y si no lo encuentra retorna el mensaje "Not Found"
    */
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