const express = require('express');
const db = require('./userDb');
const { restart } = require('nodemon');

const router = express.Router();

router.post('/', (req, res) => {
  // do your magic!
});

router.post('/:id/posts', validatePost, (req, res) => {
  // do your magic!
});

router.get('/', (req, res, next) => {
  // do your magic!
  db.get().then(users=>{
    res.status(200).json(users);
  }).catch(err=>{
    next(err);
  });
});

router.get('/:id', validateUserId, (req, res) => {
  res.status(200).json(req.user);
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  db.getById(req.params.id).then(user=>{
    if(!user) return res.status(400).json({message: "invalid user id"});
    req.user = user;
    next();
  }).catch(err=>{
    next(err);
  });
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
  if(!req.body) return res.status(400).json({message: "missing post data"});
  if(!req.body.text) return res.status(400).json({message: "missing required text field"});
  next();
}

module.exports = router;
