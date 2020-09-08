const express = require('express');
const db = require('./userDb');
const {insert: insertPost} = require("../posts/postDb");

const router = express.Router();

router.post('/', validateUser, (req, res, next) => {
  db.insert(req.body).then(user=>{
    res.status(201).json(user);
  }).catch(err=>{
    next(err);
  })
});

router.post('/:id/posts', [validateUserId, validatePost], (req, res, next) => {
  const post = {...req.body, user_id: req.user.id};

  insertPost(post).then(newPost=>{
    res.status(201).json(newPost);
  }).catch(err=>{
    next(err);
  })
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

router.get('/:id/posts', validateUserId, (req, res, next) => {
  // do your magic!
  db.getUserPosts(req.user.id).then(posts=>{
    res.status(200).json(posts);
  }).catch(err=>{
    next(err);
  })
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
  if(!req.body) return res.status(400).json({message: "missing user data"});
  if(!req.body.name) return res.status(400).json({message: "missing required name field"});
  next();
}

function validatePost(req, res, next) {
  // do your magic!
  if(!req.body) return res.status(400).json({message: "missing post data"});
  if(!req.body.text) return res.status(400).json({message: "missing required text field"});
  next();
}

module.exports = router;
