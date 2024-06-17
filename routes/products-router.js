import { Router } from "express";
import * as controllers from "../controllers/product-controller.js";
const router = Router();

router.get('/', controllers.getAllProducts)

router.get('/:pid', controllers.getById)

router.post('/', controllers.addProduct)

router.delete('/:pid', controllers.deleteProd)

router.put('/:pid', controllers.updateProduct)

export default router;