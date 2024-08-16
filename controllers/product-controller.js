import { productRepository } from "../repository/index.js";



export const getAllProducts = async (req, res) => {
    try { 
        const {page, limit,name, sort} = req.query;
        const response = await productRepository.getProducts(page, limit,name, sort);
        const nextLink = response.hasNextPage ?  `http://localhost:8080/products?page=${response.nextPage}` : null
        const prevLink = response.hasPrevPage ?  `http://localhost:8080/products?page=${response.prevPage}` : null
        const infoProducts = {
            status: 'success',
            payload: response.docs,
            totalPages: response.totalPages,
            page: response.page,
            prevPage: response.prevPage,
            nextPage: response.nextPage,
            hasNextPage: response.hasNextPage,
            hasPrevPage: response.hasPrevPage,
            prevLink,
            nextLink
        }
        
        // const user = await userModel.findById(req.session?.passport?.user) 
        // console.log(req.sessionID);
        res.status(200).render('index', {
            infoProducts: infoProducts
            // user: user? user : null
        })

    } catch (error) {
        console.log(error);
    }
}

export const addProduct = async (req, res) => {
    try {
        const product = req.product
        const newProduct = await productRepository.create(product)
        res.json(newProduct)
    } catch (error) {
        console.log(error);
        res.json(error)
    }
}

export const getById = async (req, res) => {
    try {
        const { id } = req.query
        const prod = await productRepository.getById(id)
        // console.log(prod);
        res.render('product',prod)
    } catch (error) {
        console.log(error);
    }
}

export const deleteProd = async (req, res) => {
    try {
        const { id } = req.query
        await productRepository.delete(id)
        res.json("Product deleted")
    } catch (error) {
        console.log(error);
    }
}

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.query
        await productRepository.update(id, req.body) 
        res.json("Product Updated")
    } catch (error) {
        console.log(error);
    }
}