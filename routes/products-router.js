import { Router } from "express";
import * as controllers from "../controllers/product-controller.js";
import { validateProduct } from "../middlewares/validate.middleware.js";
const router = Router();

router.get('/', controllers.getAllProducts)

router.get('/:pid', controllers.getById)

router.post('/', validateProduct, controllers.addProduct)

router.delete('/:pid', controllers.deleteProd)

router.put('/:pid', controllers.updateProduct)

export default router;