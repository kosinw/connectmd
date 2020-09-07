import * as Express from "express";
import * as Redis from "ioredis";
import { knexConnection } from "./loaders/database";

export interface LoaderInterface {
  expressApp: Express.Application;
}

export interface ApplicationContext {
  req: Express.Request;
  res: Express.Response;
  redis: Redis.Redis;
  knex: typeof knexConnection;
}

// TODO(kosi): Is this really the best place to put this?
export enum UserRole {
  User = "USER",
  Admin = "ADMIN",
}

export enum AuthProviderKind {
  LocalAuthProvider = "LocalAuthProvider",
  OAuthProvider = "OAuthProvider",
}
