import "reflect-metadata";

import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.withSchema("users").alterTable("identity", (t) => {
    t.jsonb("profile").nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.withSchema("users").alterTable("identity", (t) => {
    t.dropColumn("profile");
  });
}
