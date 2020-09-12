import { Resolver, Query, Maybe, Ctx, Arg, Authorized } from "type-graphql";
import { UserIdentity } from "../models/user.models";
import { ContextType, UserRole } from "../types";

@Resolver()
export class UserResolver {
  @Authorized()
  @Query((type) => UserIdentity)
  async me(@Ctx() { req }: ContextType): Promise<UserIdentity> {
    const query = UserIdentity.query()
      .where({
        id: req.session.userId,
      })
      .withGraphFetched({
        providers: true,
      })
      .first();

    return await query;
  }

  @Authorized(UserRole.Administrator)
  @Query(() => [UserIdentity])
  async users(
    @Arg("limit", { nullable: true }) limit: number
  ): Promise<UserIdentity[]> {
    const query = UserIdentity.query()
      .withGraphFetched({
        providers: true,
      })
      .orderBy("id", "DESC");

    if (!!limit) {
      query.limit(limit);
    }

    return await query;
  }
}
