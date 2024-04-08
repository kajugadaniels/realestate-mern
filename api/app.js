import express from "express"
import authRouter from './routes/auth.route.js'

const app = express()

app.get("api/auth", authRouter)

app.listen(8000, () => {
    console.log("Server is running")
})