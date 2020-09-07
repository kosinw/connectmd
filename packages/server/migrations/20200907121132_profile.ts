import "reflect-metadata";

import * as Knex from "knex";
import { ProfileKind } from "../src/types";

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .withSchema("users")
    .createTableIfNotExists("profile", (t) => {
      t.string("id", 32).primary();
      t.enu("kind", Object.values(ProfileKind), {
        useNative: true,
        enumName: "profile_kind",
      });
      t.string("firstName", 255);
      t.string("lastName", 255);
      t.string("profileUri");

      t.string("speciality").nullable();

      t.string("identity_id", 32)
        .references("id")
        .inTable("users.identity")
        .onDelete("cascade")
        .onUpdate("cascade");
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.withSchema("users").dropTableIfExists("profile");
}
