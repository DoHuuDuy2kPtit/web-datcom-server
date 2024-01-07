exports.up = function (knex) {
  return knex.schema.createTable("hosts", (table) => {
    table.increments("idHost").primary();
    table.uuid("idUser").notNullable();
    table.string("hostName", 255);
    table.text("avatarHost");
    table.string("numberBankAccount", 20);
    table.string("bankName", 100);
    table.string("accountName", 100);
    table.text("imgQrCode");
    table.timestamp("createdAt").defaultTo(knex.fn.now());
    table.timestamp("updatedAt").defaultTo(knex.fn.now());
    // table.foreign("idUser").references("idUser").inTable("users");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("hosts");
};
