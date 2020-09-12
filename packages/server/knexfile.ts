// Update with your config settings.
import { config } from "./src/config";

export default {
  development: {
    ...config.database,
  },
};
