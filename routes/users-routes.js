const express = require('express');
const Workouts = require('../models/workouts');

const router = express.Router();

// for all endpoints beginning with /api/users
router.post('/register', (req, res) => {
  const credentials = req.body;
  const { username, password } = credentials;

  if (!(username && password)) {
    return res.status(400).json({ message: "username and password required."})
  }

  Workouts.addUser(credentials)
    .then(user => {
      res.status(200).json(user)
    })
    .catch(error => {
      if (error.errno == 19) {
        res.status(400).json({ message: "Username already taken."})
      } else {
        res.status(500).json(error)
      }
    })
})

module.exports = router;