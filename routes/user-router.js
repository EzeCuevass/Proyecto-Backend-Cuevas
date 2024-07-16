import { Router } from "express";
import * as controllers from "../controllers/user-controller.js"
import passport from "passport"
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
    res.redirect('/products')
})

router.get('/logout', controllers.logOut)

router.get('/profile', controllers.profileView)

export default router;