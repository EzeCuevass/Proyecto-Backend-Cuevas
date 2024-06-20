import { connect } from 'mongoose'
import 'dotenv/config'

const MONGO = process.env.MONGO_URL

export const initMongoDB = async () => {
    try {
        await connect(MONGO)
        console.log("conectado a mongo");
    } catch (error) {
        console.log(error);
    }
}