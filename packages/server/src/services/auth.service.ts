import { logger } from "../loaders/logger";
import {
  AuthProvider,
  UserLocalInput,
  UserLocalResult,
} from "../models/auth.models";
import { AuthProviderKind, ContextType } from "../types";

export class AuthService {
  public static logout(context: ContextType): Promise<Boolean> {
    const {
      req: { session },
      res,
    } = context;

    return new Promise((resolve) => {
      session.destroy((err) => {
        if (!!err) {
          logger.error(err);
          resolve(false);
        }
        res.clearCookie("connect.sid");
        resolve(true);
      });
    });
  }

  public static async loginUserLocal(
    input: UserLocalInput,
    context: ContextType
  ): Promise<UserLocalResult> {
    const { email, password } = input;
    const { req } = context;

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
}
