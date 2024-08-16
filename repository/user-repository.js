export class UserRepository {
    constructor(dao){
        this.dao = dao
    }
    async create(obj){
        return await this.dao.create(obj)
    }
    async log(email){
        return await this.dao.log(email)
    }
}