// Update with your config settings.
import { config } from "./src/config";

export default {
  development: {
    client: config.database.client,
    version: config.database.version,
    connection: config.database.connection,
  },
};
