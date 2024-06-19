import ProductManager from "../models/dao/products.dao.js";
import { ProductModel } from "../models/products_model.js";

const prodManager = new ProductManager(ProductModel)

export const getAllProducts = async (req, res) => {
    try { 
        const {page, limit,name, sort} = req.query;
        const response = await prodManager.getAll(page, limit,name, sort);
        const nextLink = response.hasNextPage ?  `http://localhost:8080/products?page=${response.nextPage}` : null
        const prevLink = response.hasPrevPage ?  `http://localhost:8080/products?page=${response.prevPage}` : null
        res.status(200).json({
            status: 'success',
            payload: response.docs,
            totalPages: response.totalPages,
            prevPage: response.prevPage,
            nextPage: response.nextPage,
            page: response.page,
            hasNextPage: response.hasNextPage,
            hasPrevPage: response.hasPrevPage,
            prevLink,
            nextLink
        })

    } catch (error) {
        console.log(error);
    }
}

export const addProduct = async (req, res) => {
    try {
        const newProduct = await prodManager.create(req.body)
        res.json(newProduct)
    } catch (error) {
        console.log(error);
        res.json(error)
    }
}

export const getById = async (req, res) => {
    try {
        const { id } = req.query
        const prod = await prodManager.getById(id)
        res.json(prod)
    } catch (error) {
        console.log(error);
    }
}

export const deleteProd = async (req, res) => {
    try {
        const { id } = req.query
        await prodManager.delete(id)
        res.json("Product deleted")
    } catch (error) {
        console.log(error);
    }
}

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.query
        await prodManager.update(id, req.body) 
        res.json("Product Updated")
    } catch (error) {
        console.log(error);
    }
}