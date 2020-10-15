const knex = require('knex');
const config = require('../knexfile');
const db = knex(config.development);

module.exports = {
  add,
  findAllWorkouts,
  findById,
  remove,
  update
};

async function add(workout) {
  const [id] = await db('workouts').insert(workout);

  return id;
};

function findAllWorkouts() {
  return db('workouts');
};

function findById(id) {
  return db('workouts')
    .where({ id }) // because table name is same as this func input param
    .first();
};

function remove(id) {
  return db('workouts')
    .where({ id })
    .del();
};

function update(id, changes) {
  return db('workouts')
    .where({ id })
    .update(changes, [id])
    .then(() => {
      return findById(id);
    })
}