import express from 'express';
import { ProductManager } from './clases.js';
const productManager = new ProductManager()
const app = express();

app.use(express.json())
app.use(express.urlencoded( {extended: true}))

const PORT = 8080

app.get('/products', async(req, res)=>{
    try {
        const products = await productManager.getProducts()
        res.json(products)
    } catch (error) {
        res.json(('Server error'))
        console.log(error);
    }
})
app.get('/products/:pid', async(req, res)=>{
    try {
        const { id } = req.query
        const product = await productManager.getProductById(parseInt(id))
        res.send(product)
    } catch (error) {
        console.log(error);
    }
})
app.post('/products', async (req, res)=> {
    try {
        console.log(req.body);
        const newProduct = await productManager.addProduct(req.body.title, req.body.description, req.body.price, req.body.thumbnail, req.body.code, req.body.stock)
        if(newProduct){
            res.status(404).json({msg: "user already exists"})
        } else {
            res.status(200).json({data:newProduct})
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message)
    }
})
app.delete('/products/:pid', async (req, res)=> {
    try {
        const { id } = req.query
        const product = await productManager.deleteProduct(parseInt(id))
        res.send(product)
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message)
    }
})
app.put('/products/:pid', async (req, res) => {
    try {
        const { id } = req.query
        const product = await productManager.updateProduct(parseInt(id), req.body.title, req.body.description, req.body.price, req.body.thumbnail, req.body.code, req.body.stock)
        res.send(product)
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message)
    }
})
app.listen(PORT, ()=>console.log(`Nkunku on port ${PORT}`));