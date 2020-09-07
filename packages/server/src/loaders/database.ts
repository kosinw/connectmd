import * as Knex from "knex";
import { config } from "../config";

const knexConfig: Knex.Config = {
  ...config.database
};

export const knexConnection = Knex.default(knexConfig);
