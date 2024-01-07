/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('order', function (table) {
      table.increments('idOrder');
      table.integer('idMenu');
      table.uuid("idUser").notNullable(); 
      table.integer("idHost").unsigned().notNullable();
      table.integer('idFood').unsigned().notNullable();
      table.integer('quantity');
      table.decimal('totalPrice', 10, 2);
      table.timestamp("createdAt").defaultTo(knex.fn.now());
      table.timestamp("updatedAt").defaultTo(knex.fn.now());
      table.tinyint('status');
      table.foreign("idUser").references("users.idUser").onDelete("CASCADE");  
      table.foreign("idHost").references("hosts.idHost").onDelete("CASCADE");  
      table.foreign("idFood").references("foods.idFood").onDelete("CASCADE");  
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function (knex) {
    return knex.schema.dropTable('order');
  };
  