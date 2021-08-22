const express = require('express');

const router = new express.Router();

const { runQuery } = require('./query-db');

const { isLoggedIn } = require('./middlewares');

// add a user to the database
router.post('/', async (req, res) => {
  const { email, password } = req.body;
  const InsertQuery = 'INSERT INTO users (email, password) VALUES (?, ?)';
  const result = await runQuery(InsertQuery, [email, password]);
  res.send({ result });
});

router.get('/', async (req, res) => {
  const SelectQuery = 'SELECT * FROM  users';
  const result = await runQuery(SelectQuery);
  res.send(result);
});

module.exports = router;
