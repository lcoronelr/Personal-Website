const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from React build (only in production)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
}

// Spotify Configuration - Add these to your .env file
const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const SPOTIFY_REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;

// Store access token in memory (you could use a database for production)
let spotifyAccessToken = null;
let tokenExpiresAt = null;

// Function to get fresh Spotify access token
async function getSpotifyAccessToken() {
  try {
    // Check if current token is still valid
    if (spotifyAccessToken && tokenExpiresAt && Date.now() < tokenExpiresAt) {
      return spotifyAccessToken;
    }

    // Get new access token using refresh token
    const response = await axios.post('https://accounts.spotify.com/api/token', 
      new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: SPOTIFY_REFRESH_TOKEN,
        client_id: SPOTIFY_CLIENT_ID,
        client_secret: SPOTIFY_CLIENT_SECRET,
      }),
      { 
        headers: { 
          'Content-Type': 'application/x-www-form-urlencoded' 
        } 
      }
    );

    spotifyAccessToken = response.data.access_token;
    tokenExpiresAt = Date.now() + (response.data.expires_in * 1000);
    
    return spotifyAccessToken;
  } catch (error) {
    console.error('Error getting Spotify access token:', error);
    return null;
  }
}

// Spotify endpoint to get YOUR recent tracks
app.get('/api/spotify/recent', async (req, res) => {
  try {
    const accessToken = await getSpotifyAccessToken();
    
    if (!accessToken) {
      return res.status(500).json({ error: 'Failed to get Spotify access token' });
    }

    // Fetch YOUR recently played tracks
    const tracksResponse = await axios.get('https://api.spotify.com/v1/me/player/recently-played?limit=3', {
      headers: { 
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });

    res.json(tracksResponse.data.items);
  } catch (error) {
    console.error('Spotify API Error:', error.response?.data || error.message);
    res.status(500).json({ 
      error: 'Failed to fetch Spotify data',
      message: error.response?.data?.error?.message || error.message 
    });
  }
});

// GitHub API route
app.get('/api/github/:username', async (req, res) => {
  try {
    const { username } = req.params;
    
    // Fetch user info
    const userResponse = await axios.get(`https://api.github.com/users/${username}`, {
      headers: {
        'Authorization': process.env.GITHUB_TOKEN ? `token ${process.env.GITHUB_TOKEN}` : undefined,
        'User-Agent': 'Portfolio-Website'
      }
    });

    // Fetch repositories
    const reposResponse = await axios.get(`https://api.github.com/users/${username}/repos`, {
      headers: {
        'Authorization': process.env.GITHUB_TOKEN ? `token ${process.env.GITHUB_TOKEN}` : undefined,
        'User-Agent': 'Portfolio-Website'
      },
      params: {
        sort: 'updated',
        per_page: 50
      }
    });
    
    // Filter and sort repos
    const repos = reposResponse.data
      .filter(repo => !repo.fork && !repo.archived)
      .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
      .slice(0, 12)
      .map(repo => ({
        id: repo.id,
        name: repo.name,
        description: repo.description,
        html_url: repo.html_url,
        homepage: repo.homepage,
        language: repo.language,
        stargazers_count: repo.stargazers_count,
        forks_count: repo.forks_count,
        updated_at: repo.updated_at,
        topics: repo.topics || []
      }));

    const result = {
      user: {
        name: userResponse.data.name,
        bio: userResponse.data.bio,
        location: userResponse.data.location,
        public_repos: userResponse.data.public_repos,
        followers: userResponse.data.followers,
        following: userResponse.data.following,
        avatar_url: userResponse.data.avatar_url,
        html_url: userResponse.data.html_url
      },
      repos: repos
    };
    
    res.json(result);
  } catch (error) {
    console.error('GitHub API Error:', error.message);
    res.status(500).json({ 
      error: 'Failed to fetch GitHub data',
      message: error.response?.data?.message || error.message 
    });
  }
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    
    console.log('Contact form submission:', { name, email, message });
    res.json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

// Handle React routing (only in production)
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  if (process.env.NODE_ENV !== 'production') {
    console.log(`API server ready for React development`);
  }
});
