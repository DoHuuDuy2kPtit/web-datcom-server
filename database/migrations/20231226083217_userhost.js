/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("userhost", (table) => {
    table.increments("idUserHost").primary();
    table.decimal("money", 10, 2);
    table.decimal("debt", 10, 2).defaultTo(0).notNullable();
    table.timestamp("createdAt").defaultTo(knex.fn.now());
    table.timestamp("updatedAt").defaultTo(knex.fn.now());
    table.uuid("idUser").notNullable(); 
    table.integer("idHost").unsigned().notNullable();
    table.foreign("idUser").references("users.idUser").onDelete("CASCADE");  
    table.foreign("idHost").references("hosts.idHost").onDelete("CASCADE");  
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("userhost");
};
