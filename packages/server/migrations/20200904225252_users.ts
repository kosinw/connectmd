import "reflect-metadata";
import * as Knex from "knex";
import { AuthProviderKind, UserRole } from "../src/types";

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createSchemaIfNotExists("users")
    .withSchema("users")
    .createTableIfNotExists("identity", function (t) {
      t.string("id", 32).primary();
      t.enu("role", Object.values(UserRole), {
        useNative: true,
        enumName: "user_role",
      }).defaultTo(UserRole.User);
    })
    .createTableIfNotExists("auth_provider", function (t) {
      t.string("id", 32).primary();
      t.enu("kind", Object.values(AuthProviderKind), {
        useNative: true,
        enumName: "auth_provider_kind",
      }).notNullable();
      t.string("email", 255).unique().nullable();
      t.string("password", 255).nullable();
      t.string("identity_id", 32)
        .references("id")
        .inTable("users.identity")
        .onDelete("cascade")
        .onUpdate("cascade");
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.raw("DROP SCHEMA IF EXISTS users CASCADE");
}
