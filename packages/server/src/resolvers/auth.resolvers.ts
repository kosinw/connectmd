import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { logger } from "../loaders/logger";
import {
  AuthProvider,
  UserLocalInput,
  UserLocalResult,
} from "../models/auth.models";
import { UserIdentity } from "../models/user.models";
import { ContextType, AuthProviderKind, UserRole } from "../types";

// TODO(kosi): Move all of this logic out into services.
@Resolver()
export class AuthResolver {
  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: ContextType): Promise<Boolean> {
    return new Promise((resolve) =>
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
    @Ctx() { req }: ContextType,
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
          .withGraphFetched({
            providers: true,
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
    @Ctx() { req }: ContextType,
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
