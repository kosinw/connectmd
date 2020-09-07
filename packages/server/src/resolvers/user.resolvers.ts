import {
  Resolver,
  Query,
  ObjectType,
  Field,
  ID,
  registerEnumType,
} from "type-graphql";
import { logger } from "../loaders/logger";
import { UserIdentityModel } from "../models/user.models";
import { UserRole } from "../types";
import { AuthProvider } from "./auth.resolvers";

registerEnumType(UserRole, {
  name: "UserRole",
});

@ObjectType()
export class UserIdentity {
  @Field((type) => ID)
  readonly id: number;

  @Field((type) => UserRole)
  role: UserRole;

  @Field((type) => AuthProvider)
  provider: AuthProvider;
}

@Resolver()
export class UserResolver {
  @Query((returns) => [UserIdentity])
  async users(): Promise<UserIdentity[]> {
    const result = await UserIdentityModel.query().withGraphFetched({
      provider: true,
    });

    logger.info(result[0].provider.kind);

    return result as UserIdentity[];
  }
}
