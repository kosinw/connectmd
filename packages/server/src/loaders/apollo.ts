import { LoaderInterface } from "../types";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import path from "path";

export const apolloLoader = async ({ expressApp: app }: LoaderInterface) => {
  const schema = await buildSchema({
    resolvers: [path.join(__dirname, "../resolvers/**/*.{js,ts}")],
    validate: false,
    emitSchemaFile: true
  });

  const server = new ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, res }),
  });

  /**
   * NOTE: cors needs to be false for express CORS to work properly.
   */
  server.applyMiddleware({ app, cors: false });
};
