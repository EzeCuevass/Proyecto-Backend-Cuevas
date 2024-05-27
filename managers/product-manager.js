// Importacion de fs
import fs from 'fs'
// Creacion de la clase, que se exporta para ser utilizada en otros archivos
export class ProductManager {
    constructor(){
        // Ruta en la que se basa el constructor, tanto como para leer, escribir, borrar o actualizar
        this.path = "./db/products.json"    
    }
    // Metodo asincrono, el cual comprueba si existe la ruta, en caso de existir lee el archivo y retorna lo
    // que haya en el, caso negativo retorna un array vacio
    async getProducts(){
        if (fs.existsSync(this.path)){
            const productsFile = await fs.promises.readFile(this.path, "utf-8")
            return JSON.parse(productsFile)
        } else {
            return []
        }
    }
    /* Metodo asincrono que agarra todos los datos necesarios para el producto, los coloca en una variable
    llamada newProduct, y si el codigo se repite, retorna un mensaje que dice que el producto ya existe
    si no, pushea el producto al array de productos y lo escribe en el .json
    */
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
    /*Metodo asincrono para crear el ID de los productos
    */
    async #createId(){
        const products = await this.getProducts();
        let maxId = 0;
        products.map((product)=>{
            if(product.id > maxId) maxId = product.id
        })
        return maxId;
    }
    /*
    Metodo asincrono para obtener un producto, por su numero de ID, trae el array de productos con el metodo
    de getProducts, y busca un producto que tenga el mismo id que el buscado, si no existe retorna "Not Found"
    si existe retorna el producto
    */
    async getProductById(idProduct){
        const products = await this.getProducts();
        const product = products.find((product)=>product.id === idProduct)
        if (!product) {
            return "Not Found"
        } else {
            return product
        }
    }
    /*
    Metodo asincrono para borrar productos, el funcionamiento es similar a getProductById, con la diferencia 
    que este, si lo encuentra, filtra para que todos los que tengan un id distinto, se queden en el array
    llamado newProducts, para luego ser pusheado con todos los productos menos el borrado
    */
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
    /*
    Metodo asincrono que actualiza el producto, toma como parametros el id, y todas las cosas a actualizar, 
    utiliza los metodos de getProducts y getProductById, para en caso que si no encuentra el producto a actualizar
    retorne que el producto no se encoontro, si lo encuentra, crea una constante de newProduct, que tiene el mismo
    id, y en todos los casos, se fija que haya un dato escrito, si no deja el que esta por defecto.
    Borra el producto a actualizar, pushea el cambio del producto, lo escribe con ds y retorna el mensaje 
    "Product has been modificated"
    */   
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
            return "Product has been modificated"
        }
        
    }
}