const express = require('express');
const request = require('request');

const router = express.Router();

const scrapGhStatus = () => {
  return new Promise((resolve, reject) => {
    request('https://www.githubstatus.com/',  { json: true }, (err, res, body) => {
      if (err) {
        reject ({ message: err });
      }

      const webComponents = body.components;

      resolve({ message: webComponents });
    });
  });
};

router.get('/ghstatus', async (req, res) => {
  try {
    const result = await scrapGhStatus();

    return res.send(result);
  } catch (err) {
    return res.send(err);
  }

});

module.exports = app => app.use('/scrap', router);