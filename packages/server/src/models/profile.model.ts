import Objection, { Model } from "objection";
import { Field, ID, InterfaceType } from "type-graphql";
import { ProfileKind } from "../types";
import { BaseModel } from "./base.model";
import { UserIdentity } from "./user.model";

@InterfaceType({
  resolveType: (value: UserProfile) => value.kind as string,
})
export class UserProfile extends BaseModel {
  static tableName = "users.profile";

  @Field((type) => ID)
  id: string;

  @Field((type) => String, { nullable: true })
  firstName: string;

  @Field((type) => String, { nullable: true })
  lastName: string;

  @Field((type) => String, { nullable: true })
  profileUri: string;

  kind: ProfileKind;
  identity: UserIdentity;

  speciality?: string;

  static relationMappings: Objection.RelationMappingsThunk = () => ({
    identity: {
      modelClass: UserIdentity,
      relation: Model.BelongsToOneRelation,
      join: {
        from: "users.profile.identity_id",
        to: "users.identity.id",
      },
    },
  });
}
