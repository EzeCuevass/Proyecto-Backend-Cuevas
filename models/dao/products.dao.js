export default class ProductManager {
    constructor(model){
        this.model = model;
    }

    async getAll(page=1, limit = 5,name, sort){
        try {
            // return await this.model.find({});
            const filter = name ? {'name':name} : {};
            let sortOrder= {};
            if(sort) sortOrder.price = sort === 'asc' ? 1 : sort === 'desc' ? -1 : null;
            const response = this.model.paginate(filter, {page, limit, sort:sortOrder})
            return response
        } catch (error) {
            console.log(error);
        }
    }
    async getById(id){
        try {
            return await this.model.findById(id)
        } catch (error) {
            console.log(error);
        }
    }
    async create(obj){
        try {
            return await this.model.create(obj)
        } catch (error) {
            console.log(error);
        }
    }
    async delete(id){
        try {
            return await this.model.findByIdAndDelete(id)
        } catch (error) {
            console.log(error);
        }
    }
    async update(id, obj){
        try {
            return await this.model.findByIdAndUpdate(id, obj, {new : true})
        } catch (error) {
            console.log(error);
        }
    }
}