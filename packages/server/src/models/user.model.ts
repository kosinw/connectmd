import { Model } from "objection";
import { UserRole } from "../types";
import { AuthProviderModel } from "./auth.model";

export class UserIdentityModel extends Model {
  id!: number;
  role!: UserRole;
  providers: AuthProviderModel[];

  static tableName = "users.identity";

  static relationMappings = {
    providers: {
      relation: Model.HasManyRelation,
      modelClass: AuthProviderModel,
      join: {
        from: "users.identity.id",
        to: "users.auth_provider.identity_id",
      },
    },
  };
}
