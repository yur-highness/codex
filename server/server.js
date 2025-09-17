import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { GoogleGenAI } from "@google/genai";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());

app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
}));

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: "Too many requests from this IP, please try again later...",
});
app.use(limiter);

app.use(express.json({ limit: "10mb" })); // Body limit is 10mb

const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
    console.error("GEMINI_API_KEY is not set in environment variables.");
    process.exit(1);
}

const ai = new GoogleGenAI({ apiKey: API_KEY });
app.get("/", (req, res) => {
    res.send("Welcome to the Code Explainer API. Use the /api/codex endpoint to explain code snippets.");
})

app.post("/api/codex", async (req, res) => {

    try{
         const {language,code} = req.body;

    if (!code) {
        return res.status(400).json({ error: "Code is required." });
    }
    
    const message = `please explain this ${language || ""} in simple terms\n\n\`\`\`${language || ""}\n${code}\n\`\`\``;

    const response = await ai.models.generateContent({
                    model: "gemini-2.5-flash",
                    contents: message,
                    maxOutputTokens: 800,
                    temperature: 0.7,
                    config: {
                        systemInstruction: "You are a god tier code explainer. You explain code in simple terms that anyone can understand.",
                        thinkingConfig: {
                            thinkingBudget: 0, // Disables thinking
                        },
                }
                });
            res.json({ response:response, language:language||"unknown" });
    }
    catch(err){ 
        console.error("Error processing request:", err);
        return res.status(500).json({ error: "Internal server error.", details:err.message });
    }
   
    // Simulate processing the code (e.g., sending to an AI model)
})


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



