import { LoaderInterface } from "../types";
import { config } from "../config";
import { redisConnection } from "./redis";
import bodyParser from "body-parser";
import helmet from "helmet";
import compression from "compression";
import session from "express-session";

export const expressLoader = async ({ expressApp: app }: LoaderInterface) => {
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
   * Middleware that transforms req.body raw strings into Javascript Objects.
   */
  app.use(bodyParser.json());

  /**
   * Middleware that transforms query parameters into rqe.params.
   */
  app.use(bodyParser.urlencoded({ extended: false }));
};
