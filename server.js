const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const cardsRouter = require("./api/cardsRouter")

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use("/cards", cardsRouter)

server.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = server;