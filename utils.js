import path from "path"
import { fileURLToPath } from "url"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default __dirname

export function createHash(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

export function comparePassword(password, hashedPassword){
    return bcrypt.compareSync(password, hashedPassword)
}

export const generateToken = (user) =>{
    
    const payload = {
        user,
        sub:user.id
    }
    return jwt.sign(payload, process.env.PRIVATE_KEY,{
        expiresIn: "5m"
    })
}
export const authToken = (req, res, next) => {
    const token = req.cookies.currentUser;
    if(!token) {
        return res.status(400).json({
            error: "Missing Token"
        })
    }
    try {
        const decoded = jwt.verify(token, process.env.PRIVATE_KEY)
        req.user = decoded.user
        next();
    } catch (error) {
        console.log(error);
        res.status(400).json(error)
    }
} 