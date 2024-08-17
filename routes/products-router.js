import { Router } from "express";
import * as controllers from "../controllers/product-controller.js";
import { validateProduct } from "../middlewares/validate.middleware.js";
import { authorizations } from "../middlewares/authorization.middleware.js";
import { authToken } from "../utils.js";

const router = Router();

router.get('/', controllers.getAllProducts)

router.get('/:pid', controllers.getById)

router.post('/', 
    authToken,
    authorizations(["admin"]),
    validateProduct,
    controllers.addProduct)

router.delete('/:pid',
    authToken,
    authorizations(["admin"]),
    validateProduct,
    controllers.deleteProd)

router.put('/:pid',
    authToken,
    authorizations(["admin"]),
    validateProduct, 
    controllers.updateProduct)

export default router;