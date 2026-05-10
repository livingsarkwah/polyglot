import express from "express"
import cors from "cors"
import getAiClient from "./getAiClient.js"


const app = express()
app.use(express.json())
app.use(cors())


app.post("/api/chat", async (req, res) => {
    try {
        console.log("Received request with body:", req.body)
        const { text, language } = req.body
        const translation = await getAiClient(language, text)
        console.log("Translation received:", translation)
        res.json({
            reply: translation
        })
        console.log("Executed request")

    } catch (error) {
        console.error("CHAT ERROR:", error)
        res.status(500).json({ error: "Server error" })
    }
})

app.listen(3000, () => console.log("Server running on port 3000"))