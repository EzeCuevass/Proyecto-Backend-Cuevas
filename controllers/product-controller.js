import ProductManager from "../models/dao/products.dao.js";
import { ProductModel } from "../models/products_model.js";

const prodManager = new ProductManager(ProductModel)

export const getAllProducts = async (req, res) => {
    try {
        const products = await prodManager.getAll();
        res.json(products)
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