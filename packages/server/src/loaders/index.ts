import * as Express from "express";
import { LoaderInterface } from "../types";
import { expressLoader } from "./express";
import { apolloLoader } from "./apollo";

export const loaders = async ({ expressApp: app }: LoaderInterface) => {
  await expressLoader({ expressApp: app });
  console.log("Express configuration loaded successfully.");

  await apolloLoader({ expressApp: app });
  console.log("Apollo server configuration loaded successfully.");
};
