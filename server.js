const express = require('express');

const db = require('./db');

const server = express();

server.use(express.json());

// Sanity check endpoint
server.get('/', (req, res) => {
  res.status(200).json({ api: 'up' });
});

server.get('/games', (req, res) => {
  try {
    res.json(db.data);
  } catch (err) {
    res.status(500).json({ Message: 'Looks like something went wrong' });
  }
});

module.exports = server;
