// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/dev.sqlite3'
    },
    useNullAsDefault: true
  },
  
  testing: {
    client: 'sqlite3',
    connection: {
      filename: './data/dev.sqlite3'
    },
    migrations:{
      directory: "./migrations"
    },
    seeds:{
      directory: "./seeds"
    },
    useNullAsDefault: true
  },

};
