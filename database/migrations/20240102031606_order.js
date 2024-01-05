/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('order', function (table) {
    table.increments('idOrder');
    table.integer('idMenu');
    table.integer('idUser');
    table.integer('idFood');
    table.integer('quantity');
    table.decimal('totalPrice', 10, 2);
    table.timestamp('orderDate').defaultTo(knex.fn.now());
    table.tinyint('status');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('order');
};
