import { ProductDto } from "../dtos/product.dto.js"

export function validateProduct(req, res, next){
    const {title,description,price,thumbnail,code,stock,categories} = req.body

    const product = new ProductDto(title,description,price,thumbnail,code,stock,categories)

    req.product = product

    next()
}