import { connect } from 'mongoose'

const MONGO_URL='mongodb+srv://EzeCuevas:viegoteamo59@cluster0.bxumzls.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0'

export const initMongoDB = async () => {
    try {
        await connect(MONGO_URL)
        console.log("conectado a mongo");
    } catch (error) {
        console.log(error);
    }
}