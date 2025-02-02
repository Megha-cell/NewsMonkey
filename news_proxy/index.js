const fetch = require('node-fetch');

module.exports = async (req, res) => {
  // Set CORS headers to allow requests from any origin
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  // Handle preflight requests (OPTIONS)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const category = req.query.category || 'general';
  const country = req.query.country || 'us';
  const pageSize = req.query.pageSize || 10;
  const apiKey = process.env.NEWS_API_KEY; // Ensure you have this in your Vercel environment variables

  const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apikey=${apiKey}&pageSize=${pageSize}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch news' });
  }
};
