/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('foods', function (table) {
      table.increments('idFood');
      table.integer("idMenu").unsigned().notNullable();
      table.string('foodName').notNullable();
      table.decimal('price', 10, 2).notNullable();
      table.string('img').notNullable();
      table.foreign("idMenu").references("menu.idMenu").onDelete("CASCADE");
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function (knex) {
    return knex.schema.dropTable('foods');
  };
  