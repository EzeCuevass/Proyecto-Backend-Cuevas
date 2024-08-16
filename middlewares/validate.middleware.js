import { authDto } from "../dtos/auth.dto.js"
import { ProductDto } from "../dtos/product.dto.js"
import { UserDto } from "../dtos/user.dto.js"

export function validateProduct(req, res, next){
    const {title,description,price,thumbnail,code,stock,categories} = req.body

    const product = new ProductDto(title,description,price,thumbnail,code,stock,categories)

    req.product = product

    next()
}

export function validateRegister(req, res, next){
    const {first_name, last_name, email, age, password} = req.body

    const user = new UserDto(first_name, last_name, email, age, password)

    req.newUser = user
}

export function validateLogin (req, res, next){
    const {email, password} = req.body

    const user = new authDto(email, password)

    req.user = user
}