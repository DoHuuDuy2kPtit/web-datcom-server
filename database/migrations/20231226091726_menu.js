/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('menu', function (table) {
      table.increments('idMenu').primary();
      table.string('menuName', 255).notNullable();

      table.dateTime('createdDate');
      table.dateTime('updatedDate');

    table.integer('idHost').unsigned().references('hosts.idHost').notNullable();
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTableIfExists('menu');
  };
  