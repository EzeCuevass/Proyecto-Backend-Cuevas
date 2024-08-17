import { v4 as uuidv4 } from 'uuid';
export class TicketDto{
    constructor(amount, purchaser){
        this.code = uuidv4();
        this.date = Date.now()
        this.amount = amount
        this.purchaser = purchaser
    }
}