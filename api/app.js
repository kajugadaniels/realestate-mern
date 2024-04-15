import express from "express"
import cookieParser from 'cookie-parser'
import authRouter from './routes/auth.route.js'

const app = express();

app.use(express.json());
app.use(cookieParser())

app.use("/api/auth", authRouter);

app.listen(8000, () => {
    console.log("Server is running")
})