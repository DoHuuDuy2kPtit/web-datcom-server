  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */

  exports.up = async function (knex) {
    await knex.schema.createTable("users", (table) => {
      table.uuid("idUser").defaultTo(knex.fn.uuid()).primary();
      table.string("userName", 45);
      table.string("phoneNumber", 20);
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
      table.timestamp("createdAt").defaultTo(knex.fn.now());
      table.timestamp("updatedAt").defaultTo(knex.fn.now());
    });
  };

  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = async function (knex) {
    await knex.schema.dropTable("users");
  };
