const express = require("express");

const workoutsRouter = require('../routes/workouts-routes');
const exerciseRouter = require('../routes/exercises-routes');

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.json({ message: "HIIIIIIIIII" });
});

server.use('/api/workouts', workoutsRouter)
server.use('/api/exercises', exerciseRouter)

module.exports = server;