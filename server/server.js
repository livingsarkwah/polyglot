import express from "express"
import getAiClient from "./getAiClient.js"


const app = express()
app.use(express.json())


app.post("/api/chat", async (req, res) => {
    try {
        const { text, language } = req.body
        const translation = await getAiClient(language, text)
        
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