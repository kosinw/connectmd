import * as Express from "express";
import * as Redis from "ioredis";
import { knexConnection } from "../loaders/database";

export interface LoaderInterface {
  expressApp: Express.Application;
}

export interface ApplicationContext {
  req: Express.Request;
  res: Express.Response;
  redis: Redis.Redis;
  knex: typeof knexConnection;
}
