import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

// it configures after importing express( after making app )
// 1. configure cors by using ( use ) it is used for configuring and set the middlewares.

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true 
}))

// 2. settings for getting data and configuring it with express
app.use(express.json({limit: "16kb"}))
// getting the data after filling the form

app.use(express.urlencoded({extended: true, limit: "16kb"}))
// getting the data from url

app.use(express.static("public"))
// for storing pdfs, files, folders, images in folder public can access anyone

app.use(cookieParser())
// to access and set the cookies to the browser of user
// server can read and remove the cookie

export { app }