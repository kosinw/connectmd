import { Resolver, Query, Ctx, ObjectType, Field } from "type-graphql";
import { ApplicationContext } from "../types";

@ObjectType()
export class User {
  @Field((type) => String)
  firstName: string;

  @Field((type) => String)
  lastName: string;

  @Field((type) => String)
  middleName: string;
}

@Resolver()
export class UserResolver {
  @Query((returns) => [User])
  async hello(@Ctx() ctx: ApplicationContext): Promise<User[]> {
    const result = await ctx
      .knex<User[]>("user_identity")
      .columns<User[]>("firstName", "lastName", "middleName");

    return result;
  }
}
