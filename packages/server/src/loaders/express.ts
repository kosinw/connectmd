import { LoaderType } from "../types";
import { config } from "../config";
import { redisConnection } from "./redis";
import bodyParser from "body-parser";
import helmet from "helmet";
import compression from "compression";
import session from "express-session";
import cors from "cors";
import * as pino from "express-pino-logger";

export const expressLoader = async ({ expressApp: app }: LoaderType) => {
  const { __prod__ } = config;

  const RedisStore = require("connect-redis")(session);

  const sessionConfig: session.SessionOptions = {
    secret: config.session.secret,
    saveUninitialized: false,
    resave: false,
    cookie: {
      sameSite: "lax",
      secure: false,
      httpOnly: true,
      maxAge: config.session.cookie.maxAge,
    },
    store: new RedisStore({ client: redisConnection }),
  };

  const corsConfig: cors.CorsOptions = {
    credentials: true,
    origin: [config.frontend.origin],
  };

  /**
   * Remove the X-Powered-By header.
   */
  app.disable("x-powered-by");

  /**
   * Production settings. These include configurations related to compression, security, logging, cookies, SSL, CORS, etc.
   */
  if (__prod__) {
    /**
     * Required if behind a reverse proxy like NGINX or Caddy.
     */
    app.enable("trust proxy");

    /**
     * TONS of sane security defaults, not completely comprehensive but a very good start.
     */
    // TODO(kosi): Come back and double check security concerns
    app.use(helmet());

    /**
     * Compresses HTTP messages.
     */
    // TODO(kosi): Maybe play around with compression value and see what works best?
    app.use(compression());

    /**
     * Enable secure, SSL only cookies.
     */
    sessionConfig.cookie!.secure = true;
  }

  /**
   * Session middleware.
   */
  app.use(session(sessionConfig));

  /**
   * CORS configuration.
   */
  app.use(cors(corsConfig));

  /**
   * Middleware that transforms req.body raw strings into Javascript Objects.
   */
  app.use(bodyParser.json());

  /**
   * Middleware that transforms query parameters into req.params.
   */
  app.use(bodyParser.urlencoded({ extended: false }));

  /**
   * Middleware that logs http requests.
   */
  app.use(pino.default());
};
