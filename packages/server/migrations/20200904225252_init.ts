import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("user_identity", function (t) {
    t.increments("id");
    t.string("firstName");
    t.string("lastName");
    t.string("middleName");
    t.timestamps();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("user_identity");
}
