require('dotenv').config()
const express = require("express")
const cors = require('cors')
const app = express()
const authRoute = require('./router/auth.router')
const contactRoute = require('./router/contact-router')
const otpRoute = require('./router/otp-router')
const connectDb = require('./utlis/db')
const errorMiddleware = require('./middlewares/error-middleware')

// let's tackle cors
const REQ_URL = 'http://localhost:5173'
// const REQ_URL = 'https://automatic-exam-bot.vercel.app'
const corsOption = {
    origin: REQ_URL,
    methods: 'GET, POST, PUT, DELETE, PATCH, HEAD',
    credentials: true,
}
app.use(cors(corsOption))

/*
    app.use(express.json())
    This line of code adds Express middleware that parses incoming request bodies with JSON payloads. It's important to place this before any 
    routes that need to handle JSON data in the request body. This middleware is responsible for parsing JSON data from requests, and it should 
    be applied at the beginning of your middleware stack to ensure it's available for all subsequent route handlers.
*/

app.use(express.json({limit: '20mb'}))
app.use(express.urlencoded({limit: '20mb', extended: true}))

/* Define all the routes */

// app.get("/", (req, res) => {
//     // res.send("Hello World")
//     res.status(200).send("Hello World")
//     console.log("Hello World")
// })

// app.get("/login", (req, res) => {
//     // res.send("Hello World")
//     res.status(200).send("Login Page")
//     console.log("Hello World")
// })

/* Define all the routes in better way */
// Mount the Router: To use the router in your main express app, you can 'mount' it at a specific url prefix

app.use("/api/auth", authRoute)
app.use("/api/form", contactRoute)
app.use("/api/otp", otpRoute)

app.use(errorMiddleware)

const PORT = 8000
connectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })
})