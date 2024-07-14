import passport from 'passport';
import local from 'passport-local';
import { userModel } from '../models/user_model.js';
import { createHash, comparePassword } from '../utils.js';
import userManager from "../models/dao/users.dao.js";


const usermanager = new userManager()

const LocalStrategy = local.Strategy

const initializePassport = () => {
    passport.use('register',
        new LocalStrategy({
            usernameField: 'email',
            passReqToCallback: true
        }, async (req, username, password, done)=>{
            try {
                let datos = {
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    email: req.body.email,
                    age: req.body.age,
                    password: createHash(req.body.password)
                }
                const newUser = await usermanager.create(datos);
                done(null, newUser)
            } catch (error) {
                done(error)
            }
        })
    )
    passport.use('login', 
        new LocalStrategy({
            usernameField: 'email',
            passReqToCallback:true
        },async (req, username, password, done) => {
            try {
                const { email, password } = req.body
                const logedUser = await usermanager.log(email)
                
                if (email == logedUser.email && comparePassword(password, logedUser.password)){
                        req.session.user = {
                            first_name: logedUser.first_name,
                            last_name: logedUser.last_name,
                            email: logedUser.email,
                            _id: logedUser._id
                        }
                    }
                    // console.log(req.session);
                    done(null, req.session.user)
                
                
            } catch (error) {
                console.log(error);
                res.json(error); 
            }
        })
    )

    passport.serializeUser((user,done)=>{
        done(null, user._id);
    });
    passport.deserializeUser(async(id,done)=>{
        try {
            const user = await userModel.findById(id)
            done(null, user)
        } catch (error) {
            done(error)
        }
    })
}

export default initializePassport