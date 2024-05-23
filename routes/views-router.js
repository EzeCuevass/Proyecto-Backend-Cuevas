import { Router } from "express";
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