import { LoaderType } from "../types";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import path from "path";
import { redisConnection } from "./redis";
import { knexConnection } from "./database";
import { authChecker } from "../utils/auth.checker";
import { Container } from "typedi";

export const apolloLoader = async ({ expressApp: app }: LoaderType) => {
  const schema = await buildSchema({
    resolvers: [path.join(__dirname, "../resolvers/**/*.{js,ts}")],
    validate: false,
    emitSchemaFile: true,
    authChecker,
    container: Container
  });

  const server = new ApolloServer({
    schema,
    context: ({ req, res }) => ({
      redis: redisConnection,
      knex: knexConnection,
      req,
      res,
    }),
    playground: {
      settings: {
        "request.credentials": "include",
      },
    },
  });

  /**
   * NOTE: cors needs to be false for express CORS to work properly.
   */
  server.applyMiddleware({ app, cors: false });
};
