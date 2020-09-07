import {
  Arg,
  Ctx,
  Field,
  ID,
  InputType,
  InterfaceType,
  Mutation,
  ObjectType,
  Resolver,
} from "type-graphql";
import { AuthProviderModel } from "../models/auth.model";
import { UserIdentityModel } from "../models/user.model";
import {
  ApplicationContext,
  AuthProviderKind,
  FieldError,
  UserRole,
} from "../types";
import { UserIdentity } from "./user.resolvers";

@InterfaceType({
  resolveType: (value: AuthProvider) => value.kind as string,
})
export abstract class AuthProvider {
  @Field((type) => ID)
  readonly id: number;

  kind: AuthProviderKind;
}

@ObjectType({ implements: AuthProvider })
export class LocalAuthProvider extends AuthProvider {
  @Field((type) => String)
  email: string;
}

@ObjectType()
export class UserLocalResult {
  @Field((type) => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field((type) => UserIdentity, { nullable: true })
  identity?: UserIdentity;
}

@InputType()
export class UserLocalInput {
  @Field((type) => String)
  email: string;

  @Field((type) => String)
  password: string;
}

// TODO(kosi): Move all of this logic out into services.
@Resolver()
export class AuthResolver {
  @Mutation((type) => UserLocalResult)
  async loginUserLocal(
    @Ctx() { req }: ApplicationContext,
    @Arg("input", (type) => UserLocalInput)
    { email, password }: UserLocalInput
  ): Promise<UserLocalResult> {
    const result = await AuthProviderModel.query()
      .where({
        kind: AuthProviderKind.LocalAuthProvider,
        email,
      })
      .first();

    if (!!result) {
      if (!!(await result.verifyPassword(password))) {
        const identity = await UserIdentityModel.query()
          .where({
            id: result.identity_id,
          })
          .withGraphFetched({
            providers: true,
          })
          .first();

        req.session!.userId = identity.id;

        return {
          identity: identity! as UserIdentity,
        };
      }
    }

    return {
      errors: [
        {
          field: "email",
          message: "Email or passsword is incorrect.",
        },
      ],
    };
  }

  @Mutation((type) => UserLocalResult)
  async createUserLocal(
    @Ctx() { req }: ApplicationContext,
    @Arg("input", (type) => UserLocalInput)
    { email, password }: UserLocalInput
  ): Promise<UserLocalResult> {
    const result = await AuthProviderModel.query()
      .where({
        kind: AuthProviderKind.LocalAuthProvider,
        email,
      })
      .first();

    if (!!result) {
      return {
        errors: [
          {
            field: "email",
            message: "This email is already registered",
          },
        ],
      };
    }

    // TODO(kosi): Do some validation stuff here or something
    const identity = await UserIdentityModel.query().insertGraphAndFetch({
      role: UserRole.User,
      providers: [
        {
          email,
          password,
          kind: AuthProviderKind.LocalAuthProvider,
        },
      ],
    });

    req.session!.userId = identity.id;

    return { identity: identity! as UserIdentity };
  }
}
