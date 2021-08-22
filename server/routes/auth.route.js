const express = require('express');
const passport = require('passport');

const router = new express.Router();

router.post('/login', passport.authenticate('local'), async (req, res) => {
  res.send({ message: 'OK' });
});

module.exports = router;
