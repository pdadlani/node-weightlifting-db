const express = require("express");

const workoutsRouter = require('../routes/workouts-routes');
const exerciseRouter = require('../routes/exercises-routes');
const usersRouter = require('../routes/users-routes');

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.json({ message: "HIIIIIIIIII" });
});

server.use('/api/workouts', workoutsRouter);
server.use('/api/exercises', exerciseRouter);
server.use('/api/users', usersRouter);

module.exports = server;