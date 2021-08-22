const express = require('express');

const router = new express.Router();
const fs = require('fs');

fs.readdirSync(__dirname).forEach((fileName) => {
  if (fileName.includes('.route.js')) {
    const routeName = fileName.split('.')[0];
    router.use(`/${routeName}`, require(`./${fileName}`));
  }
});

module.exports = router;
