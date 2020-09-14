import { Resolver, Query, Ctx, Arg, Authorized, Int } from "type-graphql";
import { UserIdentity } from "../models/user.models";
import { UserService } from "../services/user.service";
import { ContextType, UserRole } from "../types";

@Resolver()
export class UserResolver {
  @Authorized()
  @Query((type) => UserIdentity)
  async me(@Ctx() { req: { session } }: ContextType) {
    return UserService.me(session);
  }

  @Authorized(UserRole.Administrator)
  @Query(() => [UserIdentity])
  async users(@Arg("limit", (type) => Int, { nullable: true }) limit?: number) {
    return UserService.users(limit);
  }
}
