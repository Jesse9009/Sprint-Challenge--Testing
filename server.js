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

server.post('/games', async (req, res) => {
  try {
    const titles = db.data.map(game => game.title);
    const body = req.body;
    const { title, genre } = body;

    if (title && genre) {
      if (titles.includes(title)) {
        res.status(409).json({ message: 'Game already exists in database' });
      } else {
        const insert = await db.data.push(body);
        res.status(201).json(body);
      }
    } else {
      res.status(422).json({ message: 'Please enter title and genre' });
    }
  } catch (err) {
    res.status(500).json({ Message: 'Looks like something went wrong' });
  }
});

module.exports = server;
