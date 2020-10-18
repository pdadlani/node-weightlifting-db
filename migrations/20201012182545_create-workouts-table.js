
exports.up = function(knex) {
  return knex.schema
    .createTable('workouts', tbl => {
      tbl.increments()
      tbl.text('name', 120)
        .notNullable()
      tbl.timestamps(true, true)
    }) 
    .createTable('exercises', tbl => {
      tbl.increments()
      tbl.text('name', 100).notNullable()
      tbl.text('weight_lifted').notNullable()
      tbl.integer('reps').notNullable()
      tbl.text('exercise_region')
      tbl.timestamps(true, true)

      // foreign key to workouts table
      tbl.integer('workout_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('workouts')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
    }) 
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('exercises').dropTableIfExists('workouts')
};

