import userManager from "../models/dao/users.dao.js";

const usermanager = new userManager()

export const viewRegister = async(req, res) =>{
    try {
        res.render('register', {layout:'main2.handlebars'})
    } catch (error) {
        console.log(error);
        res.json(error)
    }
}

export const viewLog = async(req, res) =>{
    try {
        console.log(req.session);
        res.render('login', {layout:'main2.handlebars'})
    } catch (error) {
        console.log(error);
        res.json(error)
    }
}

export const createUser = async (req,res) => {
    try {
        const newUser = await usermanager.create(req.body);
        console.log(newUser);
        res.redirect('/sessions/login')
    } catch (error) {
        console.log(error);
        res.json(error)
    }
}
export const logUser = async (req,res) => {
    try {
        const { email, password } = req.body
        const logedUser = await usermanager.log(email)
        console.log(req.session);
        if (email == logedUser.email && password == logedUser.password){
            req.session.user = {
                first_name: logedUser.first_name,
                last_name: logedUser.last_name,
                email: logedUser.email
            }
        }
        res.json(req.session.user)
    } catch (error) {
        console.log(error);
        res.json(error);
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