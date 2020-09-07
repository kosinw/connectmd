import { Resolver, Query, Maybe, Ctx, Info } from "type-graphql";
import { UserIdentity } from "../models/user.model";
import { ApplicationContext } from "../types";

@Resolver()
export class UserResolver {
  @Query((type) => UserIdentity, { nullable: true })
  async me(@Ctx() { req }: ApplicationContext): Promise<Maybe<UserIdentity>> {
    if (!!req.session!.userId!) {
      const query = UserIdentity.query()
        .where({
          id: req.session.userId,
        })
        .allowGraph({
          providers: true,
        })
        .withGraphFetched({
          providers: true,
        })
        .first();

      return await query;
    }

    return null;
  }

  @Query(() => [UserIdentity])
  async users(): Promise<UserIdentity[]> {
    const result = await UserIdentity.query()
      .allowGraph({
        providers: true,
      })
      .withGraphFetched({
        providers: true,
      });

    return result as UserIdentity[];
  }
}
