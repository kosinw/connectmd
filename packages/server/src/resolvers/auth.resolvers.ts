import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Resolver,
} from "type-graphql";
import { logger } from "../loaders/logger";
import { AuthProvider } from "../models/auth.model";
import { UserIdentity } from "../models/user.model";
import {
  ApplicationContext,
  AuthProviderKind,
  FieldError,
  UserRole,
} from "../types";

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

// TODO(kosi): Move all of this logic out into services.
@Resolver()
export class AuthResolver {
  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: ApplicationContext): Promise<Boolean> {
    return new Promise((resolve, reject) =>
      req.session.destroy((err) => {
        if (!!err) {
          logger.error(err);
          resolve(false);
        }
        res.clearCookie("connect.sid");
        resolve(true);
      })
    );
  }

  @Mutation(() => UserLocalResult)
  async loginUserLocal(
    @Ctx() { req }: ApplicationContext,
    @Arg("input", () => UserLocalInput)
    { email, password }: UserLocalInput
  ): Promise<UserLocalResult> {
    const result = await AuthProvider.query()
      .where({
        kind: AuthProviderKind.LocalAuthProvider,
        email,
      })
      .first();

    if (!!result) {
      if (!!(await result.verifyPassword(password))) {
        const identity = await result
          .$relatedQuery("identity")
          .allowGraph({
            providers: true,
            profile: true,
          })
          .withGraphFetched({
            providers: true,
            profile: true,
          });

        req.session!.userId = identity.id;

        return { identity };
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

  @Mutation(() => UserLocalResult)
  async createUserLocal(
    @Ctx() { req }: ApplicationContext,
    @Arg("input", () => UserLocalInput)
    { email, password }: UserLocalInput
  ): Promise<UserLocalResult> {
    const result = await AuthProvider.query()
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
            message: "This email is already registered.",
          },
        ],
      };
    }

    // TODO(kosi): Do some validation stuff here or something
    const identity = await UserIdentity.query().insertGraphAndFetch({
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

    return { identity };
  }
}
