import path from "path"
import { fileURLToPath } from "url"
import bcrypt from "bcrypt"


const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default __dirname

export function createHash(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

export function comparePassword(password, hashedPassword){
    return bcrypt.compareSync(password, hashedPassword)
}