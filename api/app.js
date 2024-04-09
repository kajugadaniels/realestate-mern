import express from "express"
import authRouter from './routes/auth.route.js'

const app = express();
app.use(express.json());

app.use("/api/auth", authRouter);

app.listen(8000, () => {
    console.log("Server is running")
})