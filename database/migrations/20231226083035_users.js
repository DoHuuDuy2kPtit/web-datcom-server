/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.createTable("users", (table) => {
    table.increments("idUser").primary();
    table.string("userName", 45);
    table.string("phoneNumber", 20).unique();
    table.string("email", 100).notNullable().unique();
    table.string("passwords", 255);
    table.text("avatarUser");
    table.integer("otpCode");
    table
      .enum("status", ["Chưa xác thực", "Đã xác thực"])
      .defaultTo("Chưa xác thực");
    table.enum("role", ["host", "user"]).defaultTo("user").notNullable();
    table.tinyint("isBlocked").defaultTo(1).notNullable();
    table.integer("otpAttempts").defaultTo(0).notNullable();
    table.timestamp('createdDate').defaultTo(knex.fn.now());
    table.dateTime("editDate");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.dropTable("users");
};
