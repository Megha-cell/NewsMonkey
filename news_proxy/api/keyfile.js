const fetch = require('node-fetch');

module.exports = async (req, res) => {
  // ✅ Set CORS headers to allow frontend to access this API
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // ✅ Handle CORS Preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // ✅ Extract query params
  const { category = 'general', country = 'us', pageSize = 10 } = req.query;
  const apiKey = process.env.REACT_APP_NEWS_API_KEY; // API key from env variables

  const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&pageSize=${pageSize}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data); // Send JSON response
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch news' });
  }
};
