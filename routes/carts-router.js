// Importacion y utiliacion de router y el cartsManager
import { Router } from "express";
const router = Router();
import { cartManager } from "../managers/carts-manager.js";
const cartsManager = new cartManager()
/*
Ruta GET, utiliza el metodo getCarts y devuelve los carritos.
*/
router.get('/',async(req, res) => {
    try {
        const carts = await cartsManager.getCarts();
        res.json(carts)
    } catch (error) {
        console.log(error);
        res.json(error)
    }
})
/*
Ruta POST, utiliza el metodo createCart para crear un carrito, y lo retorna
*/
router.post('/', async (req, res) => {
    try {
        const newCart = await cartsManager.createCart()
        res.json(newCart)
    } catch (error) {
        console.log(error);
        res.json(error)
    }
})
/*
Ruta GET, recibe el id por query, y utiliza el metodo getCartById pasando como parametro el id, para devolver
el carrito encontrado por .send
*/
router.get('/:cid', async (req,res)=> {
    try {
        const { id } = req.query
        const cart = await cartsManager.getCartById(id)
        res.send(cart)
    } catch (error) {
        console.log(error);
        return error
    }
})
/*
Ruta PUT, recibe por query el Id del producto, y el id del carrito, que utiliza luego con el metodo addToCart
pasando como parametro los ya nombrados, y devuelve el carrito con los productos agregados
*/
router.put('/:cid/product/:pid', async (req,res) => {
    try {
        const pid = req.query.pid
        const cid = req.query.cid
        const newCart = await cartsManager.addtoCart(pid, cid)
        res.json(newCart)
    } catch (error) {
        console.log(error);
        res.json(error)
    }
})
export default router