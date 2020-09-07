import Objection, { Model } from "objection";
import { Field, ID, ObjectType, registerEnumType } from "type-graphql";
import { ProfileKind, UserRole } from "../types";
import { AuthProvider } from "./auth.model";
import { BaseModel } from "./base.model";
import { UserProfile } from "./profile.model";

registerEnumType(UserRole, { name: "UserRole" });

@ObjectType()
export class UserIdentity extends BaseModel {
  @Field((type) => ID)
  id: string;

  @Field((type) => UserRole)
  role!: UserRole;

  @Field((type) => [AuthProvider])
  providers: AuthProvider[];

  @Field((type) => UserProfile, { nullable: true })
  profile?: UserProfile;

  static tableName = "users.identity";

  static relationMappings: Objection.RelationMappingsThunk = () => ({
    profile: {
      relation: Model.HasOneRelation,
      modelClass: UserProfile,
      join: {
        from: "users.identity.id",
        to: "users.profile.identity_id",
      },
    },
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
