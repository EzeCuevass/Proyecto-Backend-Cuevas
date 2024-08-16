import { Router } from "express";
import * as controllers from "../controllers/user-controller.js"
import passport from "passport"
import { authToken, generateToken } from "../utils.js";
import { UserDto } from "../dtos/user.dto.js";
import { validateLogin, validateRegister } from "../middlewares/validate.middleware.js";
import { authorizations } from "../middlewares/authorization.middleware.js";


const router = Router();

router.post('/register', 
    passport.authenticate('register', 
        {failureRedirect: "/failRegister"}), 
        async(req,res)=>{
    res.redirect('/sessions/login')
})

router.get('/register', controllers.viewRegister)

router.get('/login', controllers.viewLog)

router.post('/login',
    passport.authenticate('login',
    {failureRedirect:"/failLogin"}),
    async(req,res)=>{
        req.session.user = req.user
        const token = generateToken({ 
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            email: req.user.email,
            role: req.user.role,
            id: req.user.id,
        })
        res.cookie("currentUser", token, {maxAge: 24*60*60*1000})
        res.redirect('/sessions/current') 
    })

router.get('/github', 
    passport.authenticate('github', 
        {scope:['user:email']}),
        async(req,res)=>{

        })

router.get('/githubCallback', passport.authenticate('github',
    {failureRedirect:'/sessions/login'}
), async(req,res)=>{
    req.session.user = req.user
    const token = generateToken({ 
        first_name: req.user.first_name,
        last_name: "",
        email: req.user.email,
        role: req.user.role,
        id: req.user.id 
    })
    res.cookie("currentUser", token, {maxAge: 10000})
    res.redirect('/products') 
})

router.get('/logout', controllers.logOut)

router.get('/profile', controllers.profileView)

router.get('/current',
    authToken,
(req,res) => {
    if(req.user){
        res.render("current", {user: req.user})
    } else {
        res.redirect('/sessions/login')
    }
})
router.get('/admin',
    authToken,
    authorizations(["admin"]),
    (req, res) => {
        res.render("admin")
    }
)
export default router;