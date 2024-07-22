import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

// purely connecting database without app
// it is a asynchronous method
const connectDB = async () => {
    try {
        // holding the connection response in variable
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
        // console.log(connectionInstance); //assignment
    } catch (error) {
        console.log("MONGODB connection failed ", error);
        // can exit from the process( node )
        process.exit(1)
    }
}

export default connectDB;