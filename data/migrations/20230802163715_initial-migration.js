/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('cards', (table) => {
    table.increments('id').primary();
    table.string('card_name').notNullable().unique();
    table.string('attribute').notNullable();
    table.string('level').notNullable();
    table.string('type').notNullable();
    table.string('description').notNullable();
    table.string('attack').notNullable();
    table.string('defense').notNullable();
    table.string('quantity').notNullable().defaultTo('1')
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('cards')
};
