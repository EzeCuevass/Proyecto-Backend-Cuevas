import { Router } from "express";
import { ProductManager } from "../managers/product-manager.js";
const productManager = new ProductManager()
const router = Router();

router.get("/", async(req,res)=>{
    try {
        const products = await productManager.getProducts();
        res.render('realtimeproducts', {products})
    } catch (error) {
        console.log(error);
    }
})

export default router