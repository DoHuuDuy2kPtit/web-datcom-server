/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("hosts", (table) => {
    table.increments("idHost").primary();
    table.integer("idUser").unsigned();
    table.string("hostName", 255);
    table.text("avatarHost");
    table.string("numberBankAccount", 20);
    table.string("bankName", 100);
    table.string("accountName", 100);
    table.text("imgQrCode");
    table.dateTime("createdAt");
    table.dateTime("updatedAt");
    table.foreign("idUser").references("idUser").inTable("users");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("hosts");
};
