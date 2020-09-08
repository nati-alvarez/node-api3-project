const express = require('express');
const db = require("./postDb");

const router = express.Router();

router.get('/', (req, res, next) => {
  // do your magic!
  db.get().then(posts=>{
    res.status(200).json(posts);
  }).catch(err=>{
    next(err);
  })
});

router.get('/:id', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
}

module.exports = router;
