import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import {
  AuthProvider,
  UserLocalInput,
  UserLocalResult,
} from "../models/auth.models";
import { UserIdentity } from "../models/user.models";
import { AuthService } from "../services/auth.service";
import { ContextType, AuthProviderKind, UserRole } from "../types";

// TODO(kosi): Move all of this logic out into services.
@Resolver()
export class AuthResolver {
  @Mutation(() => Boolean)
  logout(@Ctx() context: ContextType) {
    return AuthService.logout(context);
  }

  @Mutation(() => UserLocalResult)
  async loginUserLocal(
    @Ctx() context: ContextType,
    @Arg("input", () => UserLocalInput)
    input: UserLocalInput
  ) {
    return AuthService.loginUserLocal(input, context);
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
