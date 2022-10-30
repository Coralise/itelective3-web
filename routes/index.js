var express = require('express');
var router = express.Router();
var fm = require('./firebase-manager');

/* GET home page. */
router.get('/', async function(req, res, next) {
  // Render the index page as well as pass the documents
  res.render('index', { title: 'Express', url: req.url, posts: await fm.getPosts(), fm: fm });
});

module.exports = router;