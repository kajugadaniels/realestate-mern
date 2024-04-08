import express from "express"

const app = express()

app.use("/api/test", (req, res) => {
    console.log("Testing")
})

app.listen(8000, () => {
    console.log("Server is running")
})