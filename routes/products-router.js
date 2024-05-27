// Importacion y utilizacion de router, y la clase de product manager
import { Router } from "express";
import { ProductManager } from "../managers/product-manager.js";
const router = Router();
const productManager = new ProductManager()
// Ruta predefinida products, que utiliza el metodo getProducts y renderiza los productos con handlebars
router.get('/', async(req, res)=>{
    try {
        const products = await productManager.getProducts()
        res.render('index', { products })
    } catch (error) {
        res.json(('Server error'))
        console.log(error);
    }
})
// Ruta products:pid, agarra por query el id del producto a buscar, y lo retorna con .send
router.get('/:pid', async(req, res)=>{
    try {
        const { id } = req.query
        const product = await productManager.getProductById(parseInt(id))
        res.send(product)
    } catch (error) {
        console.log(error);
    }
})
/* Ruta POST, que agarra por el body, todos los parametros utilizados por el metodo addProduct, si el producto
ya existe retorna que el producto ya existe, si no existe se muestra el producto nuevo por data.
*/
router.post('/', async (req, res)=> {
    try {
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
/*
Ruta DELETE que recibe como parametro el id del producto, con un funcionamiento similar a la ruta get, solo que
aca se llama al metodo deleteProduct, que pasa el parametro con el id parseado a entero, y devuelve el producto 
borrado
*/
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
/*
Ruta PUT, que recibe el id del producto a actualizar por query, utiliza el metodo updateProduct con el id pasado
a entero, y agarra por body todos los datos a ser actualizados, y muestra con .send el producto actualiizado.
*/
router.put('/:pid', async (req, res) => {
    try {
        const { id } = req.query
        const product = await productManager.updateProduct(parseInt(id), req.body.title, req.body.description, req.body.price, req.body.thumbnail, req.body.code, req.body.stock, req.body.categories, req.body.status)
        res.send(product)
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message)
    }
})

export default router;