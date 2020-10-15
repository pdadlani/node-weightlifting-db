const express = require('express');
const Workouts = require('./models/workouts');

const server = express();

server.use(express.json());

const PORT = 5001;

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

server.get('/api/workouts/:id', (req, res) => {
  const { id } = req.params;

  Workouts.findById(id)
    .then(workout => {
      if (workout) {
        res.status(200).json(workout);
      } else {
        res.status(404).json({ message: "Workout with id not found."});
      }
    })
    .catch(error => {
      res.status(500).json({ message: "Error in find workout by id" });
    });
});

server.delete('/api/workouts/:id', (req, res) => {
  const { id } = req.params;

  Workouts.remove(id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: "Workout deleted."});
      } else {
        res.status(404).json({ message: "Workout with id not found."});
      }
    })
    .catch(error => {
      res.status(500).json({ message: "Error in deleting workout with id" });
    });
});

server.patch('/api/workouts/:id', (req, res) => {
  const { id } = req.params
  const changes = req.body

  Workouts.update(id, changes)
    .then(workout => {
      if (workout) {
        res.status(200).json(workout)
      } else {
        res.status(404).json({ message: 'Workout not found.'})
      }
    })
    .catch(error => {
      res.status(500).json({ message: "Error updating workout."});
    });
});

server.listen(PORT, () => {
  console.log(`\n*** Server running on port ${PORT} ***\n`);
});