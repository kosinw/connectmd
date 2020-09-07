import { Model } from "objection";
import { Field, ID, ObjectType, registerEnumType } from "type-graphql";
import { UserRole } from "../types";
import { AuthProvider } from "./auth.model";
import { BaseModel } from "./base.model";

registerEnumType(UserRole, { name: "UserRole" });

@ObjectType()
export class UserIdentity extends BaseModel {
  @Field((type) => ID)
  id: string;

  @Field((type) => UserRole)
  role!: UserRole;

  @Field((type) => [AuthProvider])
  providers: AuthProvider[];

  static tableName = "users.identity";

  static relationMappings = () => ({
    providers: {
      relation: Model.HasManyRelation,
      modelClass: AuthProvider,
      join: {
        from: "users.identity.id",
        to: "users.auth_provider.identity_id",
      },
    },
  });
}
