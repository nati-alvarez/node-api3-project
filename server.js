const express = require('express');
const server = express();

const userRoutes = require("./users/userRouter");

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  console.log(`REQUEST METHOD: ${req.method} REQUEST URL: ${req.url} TIMESTAMP: ${ new Date().toISOString()}`);
  next();
}

server.use(logger);

server.use("/api/users", userRoutes);

module.exports = server;
