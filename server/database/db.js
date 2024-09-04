import mongoose from "mongoose";

const Connection = async (mongo_url) => {
    const URL = mongo_url
    
    try {
        await mongoose.connect(URL);
        console.log('Database connected successfully');
    } catch(error) {
        console.log('Error while connecting with the database', error);
    }
}

export default Connection;