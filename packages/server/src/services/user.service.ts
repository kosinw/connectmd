import { QueryBuilder } from "objection";
import { Maybe } from "type-graphql";
import { UserIdentity } from "../models/user.models";

export class UserService {
  private static fetchIdentityGraph(): QueryBuilder<
    UserIdentity,
    UserIdentity[]
  > {
    return UserIdentity.query().withGraphFetched({
      providers: true,
    });
  }

  public static async me(
    session: Express.Session
  ): Promise<Maybe<UserIdentity>> {
    if (!session.userId) {
      return null;
    }

    const { userId: id } = session;

    return await UserService.fetchIdentityGraph().findById(id);
  }

  public static async users(limit?: number): Promise<UserIdentity[]> {
    const query = UserService.fetchIdentityGraph().orderBy("id", "DESC");

    if (!!limit) {
      query.limit(limit);
    }

    return await query;
  }
}
