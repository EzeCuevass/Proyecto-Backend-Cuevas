import express from 'express';
import productRouter from './routes/products-router.js'
import cartsRouter from './routes/carts-router.js'
import handlebars from 'express-handlebars'
import { Server } from 'socket.io';
import viewsRouter from './routes/views-router.js'
import { ProductManager } from './managers/product-manager.js';
const productManager = new ProductManager()
const app = express();

app.use(express.json())
app.use(express.urlencoded( {extended: true}))

app.use(express.static('./public'))
app.engine('handlebars', handlebars.engine())
app.set('views', './views');
app.set('view engine', 'handlebars');

app.use('/products', productRouter);
app.use('/carts', cartsRouter)
app.use('/realTimeProducts', viewsRouter)

const PORT = 8080

const httpServer = app.listen(PORT, ()=>console.log(`Nkunku on port ${PORT}`));

const socketServer = new Server(httpServer)

socketServer.on('connection', async(socket)=>{
    socketServer.emit('products', await productManager.getProducts())
    socket.on('newProduct', async(product)=>{
        await productManager.addProduct(product.inputTitle,product.inputDesc,product.inputPrice,product.inputThumb,product.inputCode,product.inputStock,product.inputCategories);
        socketServer.emit('products', await productManager.getProducts())
    })
    socket.on('deleteProduct', async(id)=>{
        await productManager.deleteProduct(id)
    })
})