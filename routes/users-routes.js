const express = require('express');
const Workouts = require('../models/workouts');
const bcrypt = require('bcryptjs');

const router = express.Router();

// for all endpoints beginning with /api/users
router.post('/register', (req, res) => {
  const credentials = req.body;
  const { username, password } = credentials;

  if (!(username && password)) {
    return res.status(400).json({ message: "username and password required."})
  }

  // Hash the password
  const salt = bcrypt.genSaltSync(10);
  credentials.password = bcrypt.hashSync(req.body.password, salt);

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