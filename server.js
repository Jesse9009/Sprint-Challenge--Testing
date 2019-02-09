const express = require('express');

const db = require('./db');

const server = express();

server.use(express.json());

// Sanity check endpoint
server.get('/', (req, res) => {
  res.status(200).json({ api: 'up' });
});
