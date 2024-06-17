import CartManager from "../models/dao/carts.dao.js";
import { CartModel } from "../models/carts_model.js";
import * as services from "../services/cart.services.js"

const cartManager = new CartManager(CartModel)

export const getAllCarts = async (req, res) => {
    try {
        const carts = await cartManager.getAll();
        res.json(carts)
    } catch (error) {
        console.log(error);
    }
}

export const createCart = async (req,res) => {
    try {
        const newCart = await cartManager.createCart()
        console.log(newCart);
        res.json(newCart)
    } catch (error) {
        console.log(error);
    }
}

export const getCartById = async (req, res) => {
    try {
        const { id } = req.query
        const Cart = await cartManager.getCartById(id)
        res.json(Cart)
    } catch (error) {
        console.log(error);
    }
}

export const addProdToCart = async (req,res) => {
    try {
        const {cid} = req.params
        const {pid} = req.params
        const newProdinCart = await services.addProdToCart(cid, pid)
        if(!newProdinCart) res.json({msg: "Error add product to cart"})
            else res.json(newProdinCart)
    } catch (error) {
        console.log(error);
    }
}