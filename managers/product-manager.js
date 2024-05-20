// const fs = require('fs')
import fs from 'fs'
import { title } from 'process'
export class ProductManager {
    constructor(){
        // this.products = []
        this.path = "./db/products.json"    
    }
    async getProducts(){
        if (fs.existsSync(this.path)){
            const productsFile = await fs.promises.readFile(this.path, "utf-8")
            return JSON.parse(productsFile)
        } else {
            console.log("asdfasdf");
            return []
        }
        // return this.products;
    }
    async addProduct(title,description, price, thumbnail, code = 0, stock,categories, status = true){
        const products = await this.getProducts();
        const newProduct = {
            id: await this.#createId() + 1,
            title: title,
            description: description,
            price: price,
            thumbnail: thumbnail,
            code,
            stock: stock,
            categories: categories,
            status
        }
        let arrayCodigo = products.map((product) => product.code)
        if (arrayCodigo.find(codigo => codigo == newProduct.code)) {
            console.log("This product already exists");
        } else {
            products.push(newProduct)
            await fs.promises.writeFile(this.path, JSON.stringify(products))
        }

    }
    async #createId(){
        const products = await this.getProducts();
        let maxId = 0;
        products.map((product)=>{
            if(product.id > maxId) maxId = product.id
        })
        return maxId;
    }
    async getProductById(idProduct){
        const products = await this.getProducts();
        const product = products.find((product)=>product.id === idProduct)
        if (!product) {
            return "Not Found"
        } else {
            return product
        }
    }
    async deleteProduct(idProduct){
        const products = await this.getProducts();
        const product = products.find((product)=>product.id === idProduct)
        if(!product){
            return "Product Not Found"
        } else {
            const newProducts = products.filter((product) => product.id !== idProduct)
            await fs.promises.writeFile(this.path, JSON.stringify(newProducts))
            return product
        }
    }
    async updateProduct(idProduct,newTitle,newDesc,newPrice,newThumb,newCode,newStock){
        const products = await this.getProducts();
        const product = await this.getProductById(idProduct);
        // console.log(product);
        if (!product){
            return "Product Not Found"
        } else {
            const newProduct = {
                id : idProduct,
                title: newTitle?newTitle:product.title,
                description: newDesc?newDesc:product.description,
                price: newPrice?newPrice:product.price,
                thumbnail: newThumb?newThumb:product.thumbnail,
                code:newCode?newCode:product.code,
                stock:newStock?newStock:product.stock
            } 
            const newProducts = products.filter((product) => product.id !== idProduct)
            newProducts.push(newProduct)
            await fs.promises.writeFile(this.path, JSON.stringify(newProducts))
            // console.log(newProducts);
            return "Product has been modificated"
        }
        
    }
}
// const productManager = new ProductManager();

// const pruebas = async()=> {

    // console.log(await productManager.getProducts());

// }
// pruebas()
// productManager.addProduct("Tetera", "Una tetera con una esvastica", 1500, "fotoxd.jpg", 1 , 120)
// productManager.addProduct("Taza", "Una taza", 2000, "fotoxds.jpg", 2 , 521)
// productManager.addProduct("Taza", "Una taza", 2000, "fotoxds.jpg", 2 , 521)
// productManager.addProduct("Taza", "Una taza", 2000, "fotoxds.jpg", 2 , 521)
// console.log(productManager.getProducts())
// console.log(productManager.getProductById(1));