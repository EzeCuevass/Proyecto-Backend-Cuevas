import userManager from "../models/dao/users.dao.js";
import { createHash } from "../utils.js";
import { comparePassword } from "../utils.js";


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

// export const createUser = async (req,res) => {
//     res.redirect('/sessions/login')
// }
// export const logUser = async (req,res) => {
    // try {
    //     const { email, password } = req.body
    //     const logedUser = await usermanager.log(email)
    //     if (req.session.user){
    //         res.redirect('/products')
    //     }else{
    //         if (email == logedUser.email && comparePassword(password, logedUser.password)){
    //             req.session.user = {
    //                 first_name: logedUser.first_name,
    //                 last_name: logedUser.last_name,
    //                 email: logedUser.email
    //             }
    //         }
    //         res.redirect('/products')
    //     }
        
    // } catch (error) {
    //     console.log(error);
    //     res.json(error); 
    // }
// }
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
        if (req.session.user){
            const info = req.session.user
            res.render('profile', info)
        } else {
            res.redirect('/sessions/login')
        }
    } catch (error) {
        res.status(400).json(error)
        console.log(error);
    }
}