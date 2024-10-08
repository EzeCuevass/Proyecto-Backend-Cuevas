import express from 'express';
import productRouter from './routes/products-router.js'
import cartsRouter from './routes/carts-router.js'
import handlebars from 'express-handlebars'
import { Server } from 'socket.io';
import viewsRouter from './routes/views-router.js'
import ProductManager from './daos/products.dao.js';
import { initMongoDB } from './db/connect.js';
import Handlebars from 'handlebars'
import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access';
import CartManager from './daos/carts.dao.js';
// import { CartModel } from './models/carts_model.js';
import {CartModel} from './daos/models/carts_model.js'
import userRouter from './routes/user-router.js'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import 'dotenv/config'
import MongoStore from 'connect-mongo'
import ___dirname from "./utils.js"
import passport from "passport"
import initializePassport from './config/passport.config.js';
import path from "path"
const MONGO = process.env.MONGO_URL
const cartManager = new CartManager(CartModel)
const productManager = new ProductManager()
const app = express();

app.use(express.json())
app.use(express.urlencoded( {extended: true}))
app.use("/public", express.static(path.join(___dirname, 'public')))
app.use(cookieParser())
app.use(
    session({
        secret: process.env.SECRET_SESSIONS,
        resave: true,
        saveUninitialized: true,
        store:MongoStore.create({
            mongoUrl: MONGO,
            ttl: 500,
        })
    })
)

// Passport
initializePassport()
app.use(passport.initialize())
app.use(passport.session())

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