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

router.get('/logout', controllers.logOut)

router.get('/profile', controllers.profileView)

export default router;