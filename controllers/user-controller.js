import userManager from "../daos/users.dao.js";
import { createHash } from "../utils.js";
import { comparePassword } from "../utils.js";
// import { userModel } from '../models/user_model.js';

const usermanager = new userManager()

export const viewRegister = async(req, res) =>{
    try {
        if(req.session.user){
            res.redirect('/products')
        } else {
            res.render('register')
        }
    } catch (error) {
        console.log(error);
        res.json(error)
    }
}

export const viewLog = async(req, res) =>{
    try {
        if(req.session.user){
            res.redirect('/products')
        } else {
            res.render('login')
        }
    } catch (error) {
        console.log(error);
        res.json(error)
    }
}

export const logOut = async (req,res) => {
    try {
        if(req.session.user){
            req.session.destroy()
            res.redirect("/sessions/login")
        } else {
            res.redirect("/sessions/login")
        }
    } catch (error) {
        console.log(error);
        res.json(error)
    }
}
export const profileView = async (req, res) => {
    try {
        // console.log(req);
        // console.log(req.sessionID);
        if (!req.session.user){
            return res.redirect('/sessions/login')
        }
        // const user = await userModel.findById(req.session.user.id)
        // req.session.user = user
        const info = req.session.user
        res.render('profile', info)
        
    } catch (error) {
        res.status(400).json(error)
        console.log(error);
    }
}