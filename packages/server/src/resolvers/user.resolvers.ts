import {
  Resolver,
  Query,
  ObjectType,
  Field,
  ID,
  registerEnumType,
} from "type-graphql";
import { UserIdentityModel } from "../models/user.model";
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

  @Field((type) => [AuthProvider])
  providers: AuthProvider[];
}

@Resolver()
export class UserResolver {
  @Query((returns) => [UserIdentity])
  async users(): Promise<UserIdentity[]> {
    const result = await UserIdentityModel.query().withGraphFetched({
      providers: true,
    });

    return result as UserIdentity[];
  }
}
