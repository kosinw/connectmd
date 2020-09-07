import "reflect-metadata";
import * as Knex from "knex";
import * as faker from "faker";
import { UserIdentity } from "../src/models/user.model";
import { AuthProviderKind, ProfileKind, UserRole } from "../src/types";
import Objection, { Model } from "objection";
import { stringify } from "querystring";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("users.identity").del();
  await knex("users.auth_provider").del();

  Model.knex(knex);

  const items = Array.from(
    { length: 1000 },
    (): Objection.PartialModelGraph<
      UserIdentity,
      UserIdentity & Objection.GraphParameters
    > => ({
      role: UserRole.User,
      providers: [
        {
          kind: AuthProviderKind.LocalAuthProvider,
          email: faker.internet.email(),
          password: faker.internet.password(),
        },
      ],
      profile: {
        kind: ProfileKind.Other,
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        profileUri: faker.image.avatar(),
        speciality: faker.lorem.sentence(),
      },
    })
  );

  // Seeds data
  await UserIdentity.query().insertGraph(items);
}
