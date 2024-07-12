import { userModel } from "../user_model.js"
export default class userManager {
    async create(obj){
        try {
            return await userModel.create(obj)
        } catch (error) {
            console.log(error);
        }
    }
    async log(email){
        try {
            return await userModel.findOne({email})
        } catch (error) {
            console.log(error);
        }
    }
}