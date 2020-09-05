import "dotenv/config";

const __prod__ = process.env.NODE_ENV === "production";

export const config = {
  port: parseInt(process.env.PORT!),
  database: {
    client: "pg",
    version: "12",
    connection: {
      host: process.env.POSTGRES_HOST!,
      user: process.env.POSTGRES_USER,
      port: parseInt(process.env.POSTGRES_PORT!, 10),
      password: process.env.POSTGRES_PASSWORD!,
      database: process.env.POSTGRES_DATABASE!,
    },
  },
  redis: {
    port: parseInt(process.env.REDIS_PORT!, 10),
    host: process.env.REDIS_HOST!,
  },
  session: {
    secret: process.env.SESSION_SECRET!,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7d
    },
  },
  frontend: {
    origin: process.env.FRONTEND_ORIGIN!,
  },
  __prod__,
};
