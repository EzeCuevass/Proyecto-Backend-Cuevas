import { ticketModel } from "./models/ticket_model.js";
export default class ticketManager{
    constructor(){
        this.model = ticketModel;
    }
    async createTicket(obj){
        try {
            return await this.model.create(obj)
        } catch (error) {
            console.log(error);
        }
    }
}