import Objection, { Model } from "objection";
import { AuthProviderKind, FieldError } from "../types";
import * as argon2 from "argon2";
import { Field, ID, InputType, InterfaceType, ObjectType } from "type-graphql";
import { UserIdentity } from "./user.models";
import { BaseModel } from "./base.models";

@InterfaceType({
  resolveType: (value: AuthProvider) => value.kind as string,
})
export class AuthProvider extends BaseModel {
  @Field((type) => ID)
  id: string;

  kind: AuthProviderKind;

  email?: string;
  password?: string;

  identity?: UserIdentity;

  static tableName = "users.auth_provider";

  async $beforeInsert(): Promise<void> {
    super.$beforeInsert();
    if (this.kind === AuthProviderKind.LocalAuthProvider) {
      this.password! = await argon2.hash(this.password!);
    }
  }

  async verifyPassword(password: string): Promise<boolean> {
    if (this.kind === AuthProviderKind.LocalAuthProvider) {
      return await argon2.verify(this.password!, password);
    }

    return false;
  }

  static relationMappings: Objection.RelationMappingsThunk = () => ({
    identity: {
      modelClass: UserIdentity,
      relation: Model.BelongsToOneRelation,
      join: {
        from: "users.auth_provider.identity_id",
        to: "users.identity.id",
      },
    },
  });
}

@ObjectType({ implements: AuthProvider })
export class LocalAuthProvider extends AuthProvider {
  @Field(() => String)
  email: string;
}

@ObjectType()
export class UserLocalResult {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => UserIdentity, { nullable: true })
  identity?: UserIdentity;
}

@InputType()
export class UserLocalInput {
  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;
}
