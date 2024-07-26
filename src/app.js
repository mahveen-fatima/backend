import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

// it configures after importing express( after making app )
// 1. configure cors by using ( use ) it is used for configuring and to set the middlewares.
// in production level cors method have options like origin & credientials

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true 
}))

// THREE MAJOR CONFIGURATIONs:
// 2. settings for getting data from everywhere so configuring it with express
// configuirng json with express and passing option but in earlier json uses body parser
app.use(express.json({limit: "16kb"}))
// telling express how to take the data ( of json format ) after filling the form

app.use(express.urlencoded({extended: true, limit: "16kb"}))
// how take the data from url like ( %20 gets inside the space ) so it will understand after that

app.use(express.static("public"))
// for storing pdfs, files, folders, images in folder public can access anyone

app.use(cookieParser())
// to access and set the cookies to the browser of user
// server can read and remove the cookie


// routes import
import userRouter from "./routes/user.routes.js"

// routes declaration
app.use("/api/v1/users", userRouter)


// https://localhost:8000/api/v1/user/register


export { app }