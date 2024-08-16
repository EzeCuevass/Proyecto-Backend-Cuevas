import { userModel } from "./models/user_model.js"
export default class userManager {
    constructor(){
        this.model = userModel;
    }

    async create(obj){
        try {
            return await this.model.create(obj)
        } catch (error) {
            console.log(error);
        }
    }
    async log(email){
        try {
            return await this.model.findOne({email})
        } catch (error) {
            console.log(error);
        }
    }
}