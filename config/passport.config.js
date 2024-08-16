import passport from 'passport';
import local from 'passport-local';
import { userModel } from '../daos/models/user_model.js';
import { createHash, comparePassword } from '../utils.js';
import userManager from "../daos/users.dao.js";
import GithubStrategy from "passport-github2"
import { ExtractJwt } from "passport-jwt"
import JwtStrategy from 'passport-jwt/lib/strategy.js';
import jsonwebtoken from 'jsonwebtoken';


const usermanager = new userManager()

const GITSECRET = process.env.GITHUB_CLIENT_SECRET

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
                if (!logedUser){
                    return done(null, false, { message : "Usuario no encontrado"})
                }
                if (!comparePassword(password, logedUser.password)){
                    return done(null, false, { message : "Contraseña incorrecta"})
                }
                if (email == logedUser.email && comparePassword(password, logedUser.password)){
                    console.log(comparePassword(password, logedUser.password));
                    req.session.user = {
                        first_name: logedUser.first_name,
                        last_name: logedUser.last_name,
                        email: logedUser.email,
                        id: logedUser._id
                    }
                }
                console.log(req.sessionID);
                    // console.log(req.session);
                return done(null, req.session.user)
            } catch (error) {
                console.log(error);
                res.json(error); 
            }
        })
    )
    passport.use('github',
        new GithubStrategy({
            clientID:'Iv23li4WrFh7HOXTBp9v',
            clientSecret:GITSECRET,
            callbackURL:'http://localhost:8080/sessions/githubCallback',
            scope: 'user:email'
        }, async(accessToken, refreshToken, profile, done)=>{
            try {
                const user = await userModel.findOne({email: profile.emails[0].value})
                if (user) {
                    return done(null, user)
                } else {
                    const datos = {
                        first_name: profile.displayName,
                        last_name: ' ',
                        email:profile.emails[0].value,
                        age: 18,
                        password: ' '
                    }
                    console.log(profile);
                    const newUser = await usermanager.create(datos)
                    done(null, newUser)
                }
            } catch (error) {
                done(error)
            }
        }), 
    )
    
    passport.serializeUser((user,done)=>{
        done(null, user.id);
    });
    passport.deserializeUser(async(id,done)=>{
        try {
            const user = await userModel.findById(id)
            done(null, user)
        } catch (error) {
            done(error)
        }
    })
    passport.use('jwt',
        new JwtStrategy({
            jwtFromRequest:ExtractJwt.fromExtractors([cookieExtractor]),
            secretOrKey: process.env.PRIVATE_KEY,
        },
    async(payload, done)=>{
        try {
            return done(null, payload)
        } catch (error) {
            return done(error, false, {message: "Error al validar Token JWT"})
        }
    })
    )
}
function cookieExtractor(req) {
    let token = null
    if (req && req.cookies) {
        token = req.cookies["token"]
    }
    return token
}


export default initializePassport 