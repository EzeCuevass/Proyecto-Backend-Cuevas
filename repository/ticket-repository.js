export class TicketRepository{
    constructor(dao){
        this.dao = dao
    }
    async createTicket(obj){
        return await this.dao.createTicket(obj)
    }
}