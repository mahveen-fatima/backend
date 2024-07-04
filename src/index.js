// require('dotenv').config({path: './env'}) config method is taking an object
import dotenv from "dotenv"
import connectDB from "./db/index.js";

// improved version with import
dotenv.config({
    path: "./env"
})


connectDB()

// first approach of connecting to database

// import mongoose from "mongoose";
// import { DB_NAME } from "./constants.js"

/*
import express from "express"
const app = express()

( async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        // when application cannot talk to database thats why writing a listener
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