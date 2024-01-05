/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("userhost", (table) => {
    table.increments("idUserHost").primary();
    // table.integer("idUser");
    // table.integer("idHost");
    table.decimal("money", 10, 2);
    table.decimal("debt", 10, 2).defaultTo(0).notNullable();
    table.dateTime("createdAt");
    table.dateTime("updatedAt");
    table.integer("idHost").unsigned().references("hosts.idHost").notNullable();
    table.integer("idUser").unsigned().references("users.idUser").notNullable();
    
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("userhost");
};
