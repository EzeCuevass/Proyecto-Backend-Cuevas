export class ProductDto{
    constructor(title,description,price,thumbnail,code,stock,categories){
        this.title = title
        this.description = description
        this.price = price
        this.thumbnail = thumbnail
        this.code = code
        this.stock = stock
        this.categories = categories
    }
}