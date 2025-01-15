import axios from "axios";

export default async function handler(req, res) {
  const { country, category, page, pageSize } = req.query;

  try {
    const response = await axios.get("https://newsapi.org/v2/top-headlines", {
      params: {
        country,
        category,
        page,
        pageSize,
        apiKey: process.env.REACT_APP_NEWS_API, // Make sure the API key is set as an environment variable
      },
    });
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch news" });
  }
}
