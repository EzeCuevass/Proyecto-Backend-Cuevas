import { Router } from "express";
import * as controllers from "../controllers/user-controller.js"
import passport from "passport"
import { authToken, generateToken } from "../utils.js";
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
            id: req.user.id,
        })
        res.cookie("currentUser", token, {maxAge: 10000})
        res.redirect('/sessions/profile') 
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
    console.log(req.user);
    if(req.user){
        res.render("current", {user: req.user})
    } else {
        res.redirect('/sessions/login')
    }
})
export default router;