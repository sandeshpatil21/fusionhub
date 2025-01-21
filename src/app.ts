import express from 'express';

const app = express();

// Add this line to serve static files from the public directory
app.use(express.static('public'));

// ... rest of your Express configuration and routes 