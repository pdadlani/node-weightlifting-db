const express = require('express');
const Workouts = require('./models/workouts');

const server = express();

server.use(express.json());

const PORT = 5000;

server.get('/', (req, res) => {
  res.json({ message: "HIIIIIIIIII" });
});

server.post('/api/workouts', (req, res) => {
  Workouts.add(req.body)
    .then(workout => {
      res.status(200).json(workout);
    })
    .catch(error => {
      res.status(500).json({ message: "cannot add workout" });
    });
});

server.get('/api/workouts', (req, res) => {
  Workouts.findAllWorkouts()
    .then(workouts => {
      res.status(200).json(workouts);
    })
    .catch(error => {
      res.status(500).json({ message: "unable to retrieve workouts" });
    });
});

server.listen(PORT, () => {
  console.log(`\n*** Server running on port ${PORT} ***\n`);
});