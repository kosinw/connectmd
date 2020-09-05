import "reflect-metadata";
import express from "express";
import { config } from "./config";
import { loaders } from "./loaders";

/**
 * Application entrypoint.
 */
async function main() {
  const app = express();

  /**
   * Load configurations for express, apollo-server, logging, etc.
   */
  await loaders({ expressApp: app });

  app.listen(config.port, () => {
    console.log(`🚀 Server ready at port ${config.port}`);
  });
}

main();
