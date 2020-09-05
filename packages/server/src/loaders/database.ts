import * as Knex from "knex";
import { config } from "../config";

const knexConfig: Knex.Config = {
  client: config.database.client,
  version: config.database.version,
  connection: config.database.connection,
};

export const knexConnection = Knex.default(knexConfig);
