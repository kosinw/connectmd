import * as Knex from "knex";
import { AuthProviderKind, UserRole } from "../src/types";

export async function up(knex: Knex): Promise<void[]> {
	return Promise.all([
		knex.schema.createSchema("users"),
		knex.schema.withSchema("users").createTable("auth_provider", function (t) {
			t.increments("id").primary();
			t.enu("kind", Object.values(AuthProviderKind), {
				useNative: true,
				enumName: "users.auth_provider_kind",
			}).notNullable();
			t.string("email", 255).nullable();
			t.string("password", 255).nullable();
		}),
		knex.schema.withSchema("users").createTable("identity", function (t) {
			t.increments("id").primary();
			t.enu("role", Object.values(UserRole), {
				useNative: true,
				enumName: "users.user_role",
			}).defaultTo(UserRole.User as string);
			t.integer("provider_id")
				.unsigned()
				.references("id")
				.inTable("users.auth_provider");
		}),
	]);
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropSchemaIfExists("users");
}
