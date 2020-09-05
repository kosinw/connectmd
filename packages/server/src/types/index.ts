import * as Express from "express";

export interface LoaderInterface {
  expressApp: Express.Application;
}

export interface ApplicationContext {
  req: Express.Request;
  res: Express.Response;
}
