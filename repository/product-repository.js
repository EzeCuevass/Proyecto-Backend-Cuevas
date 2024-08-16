import ProductManager from "../daos/products.dao.js";

export class ProductRepository {
    constructor(dao){
        this.dao = dao
    }
    async getProducts(page,limit,name,sort){
        return await this.dao.getAll(page,limit,name,sort);
    }
    async getById(id){
        return await this.dao.getById(id)
    }
    async create(obj){
        return await this.dao.create(obj)
    }
    async delete(id){
        return await this.dao.delete(id)
    }
    async update(id, obj){
        return await this.dao.update(id, obj)
    }
}