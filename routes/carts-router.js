import { Router } from "express";
const router = Router();
import { cartManager } from "../managers/carts-manager.js";
const cartsManager = new cartManager()

router.get('/',async(req, res) => {
    try {
        const carts = await cartsManager.getCarts();
        // console.log(cartsManager.path);
        res.json(carts)
    } catch (error) {
        console.log(error);
        res.json(error)
    }
})

router.post('/', async (req, res) => {
    try {
        const newCart = await cartsManager.createCart()
        res.json(newCart)
    } catch (error) {
        console.log(error);
        res.json(error)
    }
})

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

router.put('/:cid/product/:pid', async (req,res) => {
    try {
        const query = req.query
        const pid = req.query.pid
        const cid = req.query.cid
        console.log(cid);
        const newCart = await cartsManager.addtoCart(pid, cid)
        res.json(newCart)
    } catch (error) {
        console.log(error);
        res.json(error)
    }
})
export default router