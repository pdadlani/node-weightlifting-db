const express = require("express");
const Workouts = require("../models/workouts");

const router = express.Router();

router.post("/", (req, res) => {
  Workouts.addWorkout(req.body)
    .then((workout) => {
      res.status(200).json(workout);
    })
    .catch((error) => {
      res.status(500).json({ message: "cannot add workout" });
    });
});

router.get("/", (req, res) => {
  Workouts.findAllWorkouts()
    .then((workouts) => {
      res.status(200).json(workouts);
    })
    .catch((error) => {
      res.status(500).json({ message: "unable to retrieve workouts" });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  Workouts.findWorkoutById(id)
    .then((workout) => {
      if (workout) {
        res.status(200).json(workout);
      } else {
        res.status(404).json({ message: "Workout with id not found." });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: "Error in find workout by id" });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  Workouts.remove(id)
    .then((count) => {
      if (count > 0) {
        res.status(200).json({ message: "Workout deleted." });
      } else {
        res.status(404).json({ message: "Workout with id not found." });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: "Error in deleting workout with id" });
    });
});

router.patch("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Workouts.update(id, changes)
    .then((workout) => {
      if (workout) {
        res.status(200).json(workout);
      } else {
        res.status(404).json({ message: "Workout not found." });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: "Error updating workout." });
    });
});

router.post("/:id/exercises", (req, res) => {
  const { id } = req.params;
  const exercise = req.body;

  if (!exercise.workout_id) {
    exercise["workout_id"] = parseInt(id, 10);
  }

  Workouts.findWorkoutById(id)
    .then((workout) => {
      if (!workout) {
        res.status(404).json({ messge: "Invalid workout id." });
      }
      // Check for all required fields
      if (!exercise.name || !exercise.weight_lifted || !exercise.reps) {
        res
          .status(400)
          .json({ message: "Must providee name, weight lifted, and reps." });
      }
      // Now ready to add exercise
      Workouts.addExercise(exercise, id)
        .then((exercise) => {
          if (exercise) {
            res.status(200).json(exercise);
          }
        })
        .catch((error) => {
          res.status(500).json({ message: "Failed to add exercise." });
        });
    })
    .catch((error) => {
      res.status(500).json({ message: "Error finding workout." });
    });
});

router.get("/:id/exercises", (req, res) => {
  const { id } = req.params;

  Workouts.findExerciseByWorkoutId(id)
    .then((workouts) => {
      res.status(200).json(workouts);
    })
    .catch((error) => {
      res
        .status(500)
        .json({ message: "Cannot find Exercises for that workout." });
    });
});

module.exports = router;