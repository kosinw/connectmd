import "reflect-metadata";
import express from "express";
import { config } from "./config";
import { loaders } from "./loaders";
import { logger } from "./loaders/logger";

async function main() {
  const app = express();

  /**
   * Load configurations for express, apollo-server, logging, etc.
   */
  await loaders({ expressApp: app });

  app.listen(config.port, () => {
    logger.info(`server ready at port ${config.port}`);
  });
}

main().catch((err) => {
  logger.error(err);
});
