/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('cards', (table) => {
    table.increments('card_id').primary();
    table.string('card_name').notNullable().unique();
    table.string('attribute').notNullable();
    table.string('level').notNullable();
    table.string('type').notNullable();
    table.string('description').defaultTo('Monster Card.');
    table.string('attack').defaultTo('0');
    table.string('defense').defaultTo('0');
    table.string('quantity').defaultTo('1')
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
