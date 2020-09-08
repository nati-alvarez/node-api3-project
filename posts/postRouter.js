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

router.get('/:id', validatePostId, (req, res) => {
  res.status(200).json(req.post);
});

router.delete('/:id', validatePostId, (req, res) => {
  db.remove(req.post.id).then(deletedPost=>{
    res.status(200).json(req.post);
  }).catch(err=>{
    next(err)
  })
});

router.put('/:id', (req, res) => {
  // do your magic!
});

// custom middleware

function validatePostId(req, res, next) {
  const {id: postId} = req.params;

  db.getById(postId).then(post=>{
    if(!post) return res.status(404).json({message: "invalid post id"});
    req.post = post;
    next();
  }).catch(err=>{
    next(err);
  })
}

module.exports = router;
