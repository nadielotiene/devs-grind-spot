import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());

const KEY = process.env.OPENWEATHER_KEY;

app.get("/api/quote", async (req, res) => {
    try {
        const response = await fetch("https://zenquotes.io/api/random");
        const data = await response.json();

        res.json({
            content: data[0].q,
            author: data[0].a,
        });
    } catch (error) {
        console.error("Error fetching quote:", error);
        res.status(500).json({ error: "Failed to fetch quote" });
    }
});

app.get("/api/weather", async (req, res) => {
    const { lat, lon, units = "imperial" } = req.query;
    if (!lat || !lon) {
        return res.status(400).json({ error: "Missing latitude or longitude" });
    }

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${KEY}`
        );

        if (!response.ok) throw new Error("Error API request failed");

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.log("Error fetching weather:", error);
        res.status(500).json({ error: "Failed to fetch weather" });
    }
})

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
