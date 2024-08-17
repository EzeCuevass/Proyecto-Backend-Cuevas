import CartManager from "../daos/carts.dao.js";
import { CartModel } from "../daos/models/carts_model.js";
import { cartRepository } from "../repository/index.js";
// import * as services from "../services/cart.services.js"

const cartManager = cartRepository
export const getAllCarts = async (req, res) => {
    try {
        const carts = await cartRepository.getAll();
        res.json(carts)
    } catch (error) {
        console.log(error);
    }
}

export const createCart = async (req,res) => {
    try {
        const newCart = await cartManager.createCart()
        return newCart
    } catch (error) {
        console.log(error);
    }
}

export const getCartById = async (req, res) => {
    try {
        const { id } = req.query
        const Cart = await cartManager.getCartById(id)
        res.render('cart', Cart)
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
export const deleteProdInCart = async (req,res) => {
    try {
        const {cid} = req.params
        const {pid} = req.params
        const deletedProd = await cartManager.deleteProdInCart(cid,pid)
        res.json(deletedProd)
    } catch (error) {
        console.log(error);
    }
}
export const updateQuantity = async (req,res) => {
    try {
        const {cid} = req.params
        const {pid} = req.params
        const {quantity} = req.body
        const updateQuantity = await cartManager.updateQuantity(cid, pid, quantity)
        res.json(updateQuantity)
    } catch (error) {
        console.log(error);
    }
}
export const emptyCart = async (req,res) => {
    try {
        const {cid} = req.params
        const emptyCart = await cartManager.emptyCart(cid)
        res.json(emptyCart) 
    } catch (error) {
        console.log(error);
    }
}