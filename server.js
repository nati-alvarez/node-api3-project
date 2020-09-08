const express = require('express');
const server = express();

const userRoutes = require("./users/userRouter");
const postRoutes = require("./posts/postRouter");

server.use(express.json());

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  console.log(`REQUEST METHOD: ${req.method} REQUEST URL: ${req.url} TIMESTAMP: ${ new Date().toISOString()}`);
  next();
}

server.use(logger);

//rotues
server.use("/api/users", userRoutes);
server.use("/api/posts", postRoutes);

//error handling middleware
server.use((err, req, res, next)=>{
  console.log(err);
  res.status(500).json({message: "An error with the server occurred.", error: err});
})

module.exports = server;
