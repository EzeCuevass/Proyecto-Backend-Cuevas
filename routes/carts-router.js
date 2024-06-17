// Importacion y utiliacion de router y el cartsManager
import { Router } from "express";
const router = Router();
import { cartManager } from "../managers/carts-manager.js";
import * as controllers from "../controllers/cart-controller.js"
const cartsManager = new cartManager()

router.get('/', controllers.getAllCarts)

router.post('/', controllers.createCart)

router.get('/:cid', controllers.getCartById)

router.put('/:cid/product/:pid', controllers.addProdToCart)
export default router