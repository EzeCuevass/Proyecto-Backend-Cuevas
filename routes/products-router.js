import { Router } from "express";
const router = Router();
import { ProductManager } from "../managers/product-manager.js";
const productManager = new ProductManager()

router.get('/', async(req, res)=>{
    try {
        const products = await productManager.getProducts()
        res.json(products)
    } catch (error) {
        res.json(('Server error'))
        console.log(error);
    }
})
router.get('/:pid', async(req, res)=>{
    try {
        const { id } = req.query
        const product = await productManager.getProductById(parseInt(id))
        res.send(product)
    } catch (error) {
        console.log(error);
    }
})
router.post('/', async (req, res)=> {
    try {
        console.log(req.body);
        const newProduct = await productManager.addProduct(req.body.title, req.body.description, req.body.price, req.body.thumbnail, req.body.code, req.body.stock, req.body.categories, req.body.status)
        if(newProduct){
            res.status(404).json({msg: "product already exists"})
        } else {
            res.status(200).json({data:newProduct})
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message)
    }
})
router.delete('/:pid', async (req, res)=> {
    try {
        const { id } = req.query
        const product = await productManager.deleteProduct(parseInt(id))
        res.send(product)
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message)
    }
})
router.put('/:pid', async (req, res) => {
    try {
        const { id } = req.query
        const product = await productManager.updateProduct(parseInt(id), req.body.title, req.body.description, req.body.price, req.body.thumbnail, req.body.code, req.body.stock, req.body.categories, req.body.status)
        console.log(product);
        res.send(product)
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message)
    }
})

export default router;