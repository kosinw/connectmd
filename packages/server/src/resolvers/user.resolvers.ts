import { Resolver, Query, Maybe, Ctx, Arg } from "type-graphql";
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
          profile: true,
        })
        .withGraphFetched({
          providers: true,
          profile: true,
        })
        .first();

      return await query;
    }

    return null;
  }

  @Query(() => [UserIdentity])
  async users(
    @Arg("limit", { nullable: true }) limit: number
  ): Promise<UserIdentity[]> {
    const query = UserIdentity.query()
      .allowGraph({
        providers: true,
        profile: true,
      })
      .withGraphFetched({
        providers: true,
        profile: true,
      })
      .orderBy("id", "DESC");

    if (!!limit) {
      query.limit(limit);
    }

    return await query;
  }
}
