const express = require('express');
const Workouts = require('../models/workouts');

const router = express.Router();

router.get('/', (req, res) => {
  Workouts.findAllUsers()
    .then(users => {
      res.status(200).json(users)
    })
    .catch(error => {
      res.status(500).json({ message: "Unable to retrieve users."})
    })
})

router.get('/:username', (req, res) => {
  const { username } = req.params;

  Workouts.findUserByUsername({ username })
    .then(user => {
      res.status(200).json(user)
    })
    .catch(error => {
      res.status(500).json({ message: "No user with that username."})
    })
})

module.exports = router;