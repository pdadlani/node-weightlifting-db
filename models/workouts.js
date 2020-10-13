const knex = require('knex');
const config = require('../knexfile');
const db = knex(config.development);

module.exports = {
  add,
  findAllWorkouts
};

async function add(workout) {
  const [id] = await db('workouts').insert(workout);

  return id;
};

function findAllWorkouts() {
  return db('workouts');
}