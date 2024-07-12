import express from 'express';
import productRouter from './routes/products-router.js'
import cartsRouter from './routes/carts-router.js'
import handlebars from 'express-handlebars'
import { Server } from 'socket.io';
import viewsRouter from './routes/views-router.js'
import { ProductManager } from './managers/product-manager.js';
import { initMongoDB } from './db/connect.js';
import Handlebars from 'handlebars'
import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access';
import CartManager from './models/dao/carts.dao.js';
import { CartModel } from './models/carts_model.js';
import * as services from "./services/cart.services.js"
import userRouter from './routes/user-router.js'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import 'dotenv/config'
import MongoStore from 'connect-mongo'
import ___dirname from "./utils.js"

const MONGO = process.env.MONGO_URL
const cartManager = new CartManager(CartModel)
const productManager = new ProductManager()
const app = express();

app.use(express.json())
app.use(express.urlencoded( {extended: true}))
app.use(express.static(___dirname+'./public'))
app.use(cookieParser("s3cr3t59"))
app.use(
    session({
        secret: "viegoteamo59",
        resave: true,
        saveUninitialized: true,
        store:MongoStore.create({
            mongoUrl: "mongodb+srv://EzeCuevas:viegoteamo59@cluster0.bxumzls.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0",
            ttl: 120,
        })
    })
)

// Handlebars

app.engine('handlebars', handlebars.engine({
    defaultLayout: 'main',
    handlebars: allowInsecurePrototypeAccess(Handlebars) 
}))
app.set('views', './views');
app.set('view engine', 'handlebars');

// Rutas

app.use('/products', productRouter);
app.use('/carts', cartsRouter)
app.use('/realTimeProducts', viewsRouter)
app.use('/sessions', userRouter)

initMongoDB()

const PORT = 8080

// HTTP Server

const httpServer = app.listen(PORT, ()=>console.log(`Nkunku on port ${PORT}`));

// Server con socket.io, para actualizaciones en tiempo real

const socketServer = new Server(httpServer)

// Cuando las rutas con socket.io reciben una conexion, se lleva a cabo el siguiente codigo:
socketServer.on('connection', async(socket)=>{
    // El serviddor, emite una "funcion" con el nombre products, que contiene los productos, que son traidos
    // con el Product Manager
    socketServer.emit('products', await productManager.getProducts())
    // Cuando del lado del clente se recibe la funcion de "newProduct", trae el producto nuevo y lo introduce
    // en el .json con el productManager, y esto se imprime de nuevo en pantalla con la linea de abajo que
    // trae de nuevo los productos
    socket.on('newProduct', async(product)=>{
        await productManager.addProduct(product.inputTitle,product.inputDesc,product.inputPrice,product.inputThumb,product.inputCode,product.inputStock,product.inputCategories);
        socketServer.emit('products', await productManager.getProducts())
    })
    // En el momento que se ejecuta el deleteProduct del lado del cliente, se recibe el id y se elimina con
    // el metodo deleteProduct
    socket.on('deleteProduct', async(id)=>{
        await productManager.deleteProduct(id)
    })
    socket.on('cart', async(cart)=>{
        const cartFront = await cartManager.createCart()
        socket.emit('cartFront', cartFront)
    })
    socket.on('addProductToCart', async (data) => {
        const cid = data.cartId
        const pid = data.prodId
        const newProdinCart = await cartManager.addProdToCart(cid, pid)
        // Lógica para agregar el producto al carrito
    })
    socket.on('error', (err)=>{
        console.error('Error en Socket.io', err)
    })
})