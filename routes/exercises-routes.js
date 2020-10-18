const express = require("express");
const Workouts = require("../models/workouts");

const router = express.Router();

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  Workouts.removeExercise(id)
    .then((count) => {
      if (count > 0) {
        res
          .status(200)
          .json({ message: `Exercise with id ${id} was deleted.` });
      } else {
        res.status(404).json({ message: "No exercise at that location." });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: "Error deleting exercise." });
    });
});

module.exports = router;