import * as Express from "express";
import { LoaderInterface } from "../types";
import { expressLoader } from "./express";
import { apolloLoader } from "./apollo";
import { logger } from "./logger";

export const loaders = async ({ expressApp: app }: LoaderInterface) => {
  await expressLoader({ expressApp: app });
  logger.info("express configuration loaded successfully");

  await apolloLoader({ expressApp: app });
  logger.info("apollo server configuration loaded successfully");
};
