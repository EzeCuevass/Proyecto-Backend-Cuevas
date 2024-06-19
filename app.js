import express from 'express';
import productRouter from './routes/products-router.js'
import cartsRouter from './routes/carts-router.js'
import handlebars from 'express-handlebars'
import { Server } from 'socket.io';
import viewsRouter from './routes/views-router.js'
import { ProductManager } from './managers/product-manager.js';
import { initMongoDB } from './db/connect.js'; 

const productManager = new ProductManager()
const app = express();

app.use(express.json())
app.use(express.urlencoded( {extended: true}))
app.use(express.static('./public'))

// Handlebars

app.engine('handlebars', handlebars.engine())
app.set('views', './views');
app.set('view engine', 'handlebars');

// Rutas

app.use('/products', productRouter);
app.use('/carts', cartsRouter)
app.use('/realTimeProducts', viewsRouter)

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
})