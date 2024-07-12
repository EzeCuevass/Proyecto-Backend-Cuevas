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

export const createUser = async (req,res) => {
    try {
        const newUser = await usermanager.create(req.body);
        console.log(newUser);
        res.json(newUser)
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
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email
            }
        }
        res.json(req.session)
    } catch (error) {
        console.log(error);
        res.json(error);
    }
}