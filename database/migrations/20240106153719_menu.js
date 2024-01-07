  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.up = function (knex) {
    return knex.schema.createTable("menu", function (table) {
      table.increments("idMenu").primary();
      table.integer("idHost").unsigned().notNullable();
      table.string("menuName", 255).notNullable();
      table.timestamp("createdAt").defaultTo(knex.fn.now());
      table.timestamp("updatedAt").defaultTo(knex.fn.now());
      table.foreign("idHost").references("hosts.idHost").onDelete("CASCADE");
    });
  };

  exports.down = async function (knex) {
    await knex.schema.dropTable("menu");
  };
