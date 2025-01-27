const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config(); // Load environment variables from .env file

const app = express();
const PORT = 5000; // The port where your proxy server will run

// Enable CORS so your React app can connect to the proxy
app.use(cors());

// Proxy endpoint to fetch news
app.get("/news", async (req, res) => {
  try {
    const { country, category, page, pageSize } = req.query; // Get parameters from the request

    // Make a request to the NewsAPI
    const response = await axios.get("https://newsapi.org/v2/top-headlines", {
      params: {
        country,
        category,
        page,
        pageSize,
        apiKey: process.env.REACT_APP_NEWS_API_KEY, // Use your API key from .env
      },
    });

    // Send the data back to the React app
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching news:", error.message);
    res.status(500).json({ error: "Error fetching news" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});
