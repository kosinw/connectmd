import { Model } from "objection";
import { AuthProviderKind, UserRole } from "../types";

export class AuthProviderModel extends Model {
	id!: number;
	kind!: AuthProviderKind;

	email?: string;
	password?: string;

	static tableName = "users.auth_provider";
}

export class UserIdentityModel extends Model {
	id!: number;
	role!: UserRole;
	provider: AuthProviderModel;

	static tableName = "users.identity";

	static relationMappings = {
		provider: {
			relation: Model.HasOneRelation,
			modelClass: AuthProviderModel,
			join: {
				from: "users.identity.provider_id",
				to: "users.auth_provider.id",
			},
		},
	};
}
