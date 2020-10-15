const knex = require('knex');
const config = require('../knexfile');
const db = knex(config.development);

module.exports = {
  addWorkout,
  findAllWorkouts,
  findWorkoutById,
  remove,
  update,
  addExercise,
  findExerciseById
};

async function addWorkout(workout) {
  const [id] = await db('workouts').insert(workout);

  return id;
};

function findAllWorkouts() {
  return db('workouts');
};

function findWorkoutById(id) {
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
      return findWorkoutById(id);
    })
}
function findExerciseById(id) {
  return db("exercises")
    .where({ id })
    .first();
}

async function addExercise(exercise, workout_id) {
  const [id] = await db("exercises")
    .where({ workout_id })
    .insert(exercise);
  return findExerciseById(id);
}