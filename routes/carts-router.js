// Importacion y utiliacion de router y el cartsManager
import { Router } from "express";
const router = Router();
// import { cartManager } from "../managers/carts-manager.js";
// import CartManager from "../daos/carts.dao.js";
import * as controllers from "../controllers/cart-controller.js"
import { authorizations } from "../middlewares/authorization.middleware.js";
import { authToken } from "../utils.js";

// const cartsManager = new cartManager()

router.get('/', controllers.getAllCarts)

router.post('/', 
    authToken,
    authorizations(["user"]),
    controllers.createCart)

router.get('/:cid', 
    authToken,
    authorizations(["user"]),
    controllers.getCartById,
)

router.post('/:cid/product/:pid', 
    authToken,
    authorizations(["user"]),
    controllers.addProdToCart)

router.delete('/:cid/product/:pid',
    authToken,
    authorizations(["user"]),
    controllers.deleteProdInCart)

router.put('/:cid/product/:pid', 
    authToken,
    authorizations(["user"]),
    controllers.updateQuantity)

router.delete('/:cid', 
    authToken,
    authorizations(["user"]),
    controllers.emptyCart)

router.post('/:cid/purchase',
    authToken,
    authorizations(["user"]),
    controllers.purchaseCart
)
export default router