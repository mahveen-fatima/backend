// require('dotenv').config({path: './env'}) config method is taking an object
// it can be run but using import form
import dotenv from "dotenv"
import connectDB from "./db/index.js";
import { app } from "./app.js";

// improved version with import
dotenv.config({
    path: "./env"
})


// asynchronous method returns a promise 
connectDB()
.catch(() => {
    app.on("error", (error) => {
        console.log("ERROR:", error);
        throw error;
    })
})

.then(() => {
    // application is listening with database
    app.listen(process.env.PORT || 8000, () => {
        console.log(` Server is running at port: ${process.env.PORT}`);
    })
})

.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})












// first approach of connecting to database

// import mongoose from "mongoose";
// import { DB_NAME } from "./constants.js"

/*
import express from "express"
const app = express()

( async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        // when application cannot able to talk to database thats why writing a app.on
        app.on("error", (error) => {
            console.log("ERROR: ", error);
            throw error
        })

        // when app is listening
        app.listen(process.env.PORT, () => {
            console.log(`App is listening on port ${process.env.PORT}`);
        })

    } catch (error) {
        console.error("ERROR: ", error)
        throw err
    }
}) ()
*/