// const knex = require('knex');
// const config = require('../knexfile');
// const db = knex(config.development);

const db = require('../data/dbConfig')

module.exports = {
  addWorkout,
  findAllWorkouts,
  findWorkoutById,
  remove,
  update,
  addExercise,
  findExerciseById,
  findExerciseByWorkoutId,
  removeExercise
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

function findExerciseByWorkoutId(workout_id) {
  return db("workouts")
    .join("exercises", "workouts.id", "exercises.workout_id")
    .select(
      "workouts.id as workout_id",
      "workouts.name as workout_name",
      "exercises.id as exercise_id",
      "exercises.name as exercise_name",
      "exercises.weight_lifted as weight_lifted",
      "exercises.reps as reps",
      "exercises.exercise_region as exercise_region"
    )
    .where({ workout_id })
}

function removeExercise(id) {
  return db("exercises")
    .where({ id })
    .del();
}