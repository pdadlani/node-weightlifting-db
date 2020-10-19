const express = require("express");
const helmet = require('helmet');
const cors = require('cors')
const authRouter = require("../routes/auth-routes");
const workoutsRouter = require('../routes/workouts-routes');
const exerciseRouter = require('../routes/exercises-routes');
const usersRouter = require('../routes/users-routes');
const private = require('../auth/privateRoutes');

const server = express();
server.use(helmet());
server.use(cors());
server.use(express.json());

server.get("/", (req, res) => {
  res.json({ message: "HIIIIIIIIII" });
});

server.use('/api/auth', authRouter);
server.use('/api/workouts', private, workoutsRouter);
server.use('/api/exercises', private, exerciseRouter);
server.use('/api/users', private, usersRouter);

module.exports = server;