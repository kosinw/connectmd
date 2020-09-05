import "dotenv/config";

export const config = {
  database: {
    client: "pg",
    version: "12",
    connection: {
      host: process.env.POSTGRES_HOST!,
      user: process.env.POSTGRES_USER,
      port: parseInt(process.env.POSTGRES_PORT!),
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
    },
  },
};
