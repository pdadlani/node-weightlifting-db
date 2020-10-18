const express = require('express');
const bcrypt = require("bcryptjs");
const Workouts = require("../models/workouts");
const generateToken = require('../auth/generateToken');
const { loginValidation, registerValidation } = require("../validation");

const router = express.Router();

// for all endpoints beginning with /api/users
router.post('/register', (req, res) => {
  const credentials = req.body;

  // Validate data before making a user
  const {error} = registerValidation(req.body);
  
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  // Hash the password
  const salt = bcrypt.genSaltSync(10);
  credentials.password = bcrypt.hashSync(credentials.password, salt);

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

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Validate data before accessing user info
  const { error } = loginValidation(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  };

  Workouts.findUserByUsername(username)
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user)
        res.status(200).json({ message: `Welcome ${user.username}!`, token})
      } else {
        res.status(401).json({ message: "Invalid credentials."})
      }
    })
    .catch(error => {
      res.status(500).json(error);
    })
})

module.exports = router;